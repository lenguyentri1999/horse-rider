import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { CampService, SourceEnum } from '../../services/camp.service';
import { Camp } from 'src/models/camp';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, ModalController, PopoverController, ToastController, IonContent, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { MapboxService, CampQuery, MapboxSearchResult } from 'src/app/services/mapbox.service';
import { AutoCompleteComponent } from 'ionic4-auto-complete';
import { MapboxPlace } from 'src/models/mapboxResult';
import { map, tap, switchMap, first, flatMap } from 'rxjs/operators';
import { Observable, of, combineLatest, from, forkJoin, BehaviorSubject } from 'rxjs';
import { Coords } from 'src/models/coords';
import { NavParamsService } from 'src/app/services/nav-params.service';
import { FilterModalComponent } from 'src/app/components/filter-modal/filter-modal.component';
import { SortPopoverComponent } from 'src/app/components/sort-popover/sort-popover.component';
import { CampSearchService, SearchResult } from 'src/app/services/camp-search.service';
import { CommonFilter } from 'src/models/filter';
import { FilterService } from 'src/app/services/filter.service';
import { FirebaseTable } from 'src/models/firebase/statusTable';
import { CampSearchFormValues } from 'src/app/components/camp-search-form/camp-search-form.component';
import { TrailSearchFormValues } from 'src/app/components/trail-search-form/trail-search-form.component';
import { RequestNewCampComponent } from 'src/app/components/request-new-camp/request-new-camp.component';
import { ICampSearchQueryParams, CampSearchQueryParams } from 'src/models/navModels/campSearchQueryParam';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit, AfterViewInit {
  @ViewChild('textSearch', { static: false }) textSearchBar: AutoCompleteComponent;
  @ViewChild('locationSearch', { static: false }) locationSearchBar: AutoCompleteComponent;
  @ViewChild(IonContent, { static: false }) content: IonContent;

  isTrail: Observable<boolean>;

  p = 1;
  itemsPerPage = 10;

  readonly filter: Observable<CommonFilter>;
  readonly originalDataSource$: Observable<FirebaseTable<Camp>>;

  camps: Observable<Camp[]> = new Observable<Camp[]>();
  campsMarkers: Observable<MapboxPlace[]>;

  isMapView = false;

  // Camps/Trail attributes filter
  campAttributesFilters: Observable<CampSearchFormValues>;
  trailAttributesFilters: Observable<TrailSearchFormValues>;
  trailFiltersCount: Observable<number>;

  constructor(
    public mapboxService: MapboxService,
    public campSearchService: CampSearchService,
    protected campService: CampService,
    protected router: Router,
    protected route: ActivatedRoute,
    protected navCtrl: NavController,
    protected authService: AuthService,
    protected navParamService: NavParamsService,
    protected filterService: FilterService,
    protected modalCtrl: ModalController,
    protected popoverCtrl: PopoverController,
    protected toastCtrl: ToastController,
    protected loadCtrl: LoadingController,
  ) {
    this.originalDataSource$ = this.initDataSource();
    this.filter = this.filterService.getFilter();
    this.isTrail = this.getCampOrTrail().pipe(
      map(val => val === SourceEnum.HorseTrails)
    );

    this.trailAttributesFilters = this.filterService.getTrailAttributesFilter();
    this.trailFiltersCount = this.trailAttributesFilters.pipe(
      map(filters => {
        if (!filters) {
          return 0;
        }
        return Object.values(filters).filter(val => val !== '').length;
      })
    );
    this.campAttributesFilters = this.filterService.getCampAttributesFilter();
  }

  ngOnInit(): void {
  }

  private getCampOrTrail(): Observable<SourceEnum> {
    return this.route.paramMap.pipe(
      map(params => {
        const source = params.get('source');
        if (source === 'trails') {
          return SourceEnum.HorseTrails;
        } else {
          return SourceEnum.HorseCamps;
        }
      })
    );
  }

  private initDataSource(): Observable<FirebaseTable<Camp>> {
    return this.getCampOrTrail().pipe(
      switchMap(sourceEnum => {
        return this.campService.getDataSourceAsMap(sourceEnum);
      })
    );
  }

  ngAfterViewInit(): void {
    // Get query 
    this.route.queryParams.pipe(

      map((param: ICampSearchQueryParams) => {
        // Set default values
        return new CampSearchQueryParams(param)
      }),

      tap(param => {
        // Set search bar values
        this.textSearchBar.keyword = param.keyword;
      }),

      switchMap(param => {
        // Set default place
        if (param.place.trim() === '') {
          return this.mapboxService.getDefaultPlace()
        }
        return this.mapboxService.forwardGeocode(param.place)
      }),

      tap(place => {
        // Set location search bar values
        this.locationSearchBar.setValue(place);
      }),

      tap(place => {
        this.searchCamps(place);
      })
    ).subscribe();
  }

  onCampSelected(result: SearchResult): void {
    this.router.navigate(result.navigateTo);
  }

  async onLocateMeButtonClick() {
    const coords = await this.mapboxService.findMe();

    this.mapboxService.reverseGeocode(coords).subscribe(place => {
      this.locationSearchBar.setValue(place);
      this.searchCamps(place);
    });
  }

  async onLocationSelected(result: MapboxSearchResult) {
    this.searchCamps(result.place);
  }

  async onSearchButton() {
    this.mapboxService.forwardGeocode(this.locationSearchBar.keyword).subscribe(place => {
      this.searchCamps(place);
    })
  }

  async searchCamps(place: MapboxPlace) {
    const loadCtrl = await this.getLoadControl();
    loadCtrl.present();

    let hashMap$ = this.originalDataSource$;

    // Filter by distance
    if (place) {
      const currCoords: Coords = {
        long: place.geometry.coordinates[0],
        lat: place.geometry.coordinates[1]
      };

      hashMap$ = this.filterByPlace(hashMap$, currCoords);
    }

    // Filter by term
    this.camps = hashMap$.pipe(
      map(allCamps => {
        if (Object.entries(allCamps).length === 0) {
          return [];
        }
        return this.campService.filterByTerm(this.textSearchBar.keyword, allCamps);
      })
    );

    // Filter by attributes
    // this.camps = combineLatest(
    //   [
    //     this.isTrail,
    //     this.camps,
    //     this.campAttributesFilters,
    //     this.trailAttributesFilters,
    //   ]).pipe(
    //     map(results => {
    //       const isTrail: boolean = results[0];
    //       const camps: Camp[] = results[1];
    //       const campAttributesFilters: CampSearchFormValues = results[2];
    //       const trailAttributesFilters: TrailSearchFormValues = results[3];

    //       if (isTrail && trailAttributesFilters) {
    //         return this.filterService.filterTrailsByAttributes(camps, trailAttributesFilters);
    //       }

    //       if (!isTrail && campAttributesFilters) {
    //         return this.filterService.filterCampsByAttributes(camps, campAttributesFilters);
    //       }

    //       return camps;
    //     })
    //   );

    // Sort by distance
    this.camps = this.camps.pipe(
      map(camps => camps.sort(this.sortByDistance))
    );

    this.camps = this.camps.pipe(
      tap(_ => loadCtrl.dismiss())
    );

    // Populate markers for map view
    this.campsMarkers = this.camps.pipe(
      map(camps => this.sliceCampByPage(camps)),
      map(camps => {
        return camps.map(camp => this.mapboxService.campToMapboxMarker(camp));
      })
    );

    this.p = 1;

  }

  private sortByDistance(a: Camp, b: Camp): number {
    return (a.distance - b.distance);
  }

  private filterByPlace(camps: Observable<FirebaseTable<Camp>>, currCoords: Coords): Observable<FirebaseTable<Camp>> {
    return combineLatest([camps, this.filter]).pipe(
      map(results => {
        const hashMap: FirebaseTable<Camp> = results[0];
        const filter = results[1];
        const keys = Object.keys(hashMap);

        const newHashMap: FirebaseTable<Camp> = {};
        keys.forEach(key => {
          const camp = hashMap[key];
          camp.distance = this.getCampDistance(camp, currCoords);

          // Filter distance
          if (camp.distance < filter.distance) {
            newHashMap[camp.id] = camp;
          }
        });
        return newHashMap;
      })
    );
  }

  private getCampDistance(camp: Camp, currCoords: Coords): number {
    return this.mapboxService.straightLineDistance(
      currCoords, camp.coords
    );
  }

  private async getLoadControl() {
    const loadCtrl = await this.loadCtrl.create({
      spinner: 'bubbles',
      message: 'Loading, please wait...'
    });
    return loadCtrl;
  }

  async onFilterButtonClick() {
    this.getCampOrTrail().pipe(
      first()
    ).
      subscribe(async source => {
        this.filterService.setSource(source);

        const popover = await this.popoverCtrl.create({
          component: FilterModalComponent,
        });
        await popover.present();
      });
  }

  async onSortButtonClick() {
    const popover = await this.popoverCtrl.create({
      component: SortPopoverComponent,
    });
    await popover.present();
  }

  async onSwitchViewButtonClick() {
    const toast = await this.toastCtrl.create({
      message: this.isMapView ? 'Switching to list view!' : 'Switching to map view!',
      duration: 700
    });
    toast.present();
    this.isMapView = !this.isMapView;

    if (this.isMapView) {
    }
  }

  private sliceCampByPage(camps: Camp[]): Camp[] {
    const startIndex = (this.p - 1) * this.itemsPerPage;
    const endIndex = this.p * this.itemsPerPage;
    return camps.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.p = page;
    if (this.content) {
      this.content.scrollToTop();
    }
  }

  async onSubmitNewCampRequest() {
    const popover = await this.popoverCtrl.create({
      component: RequestNewCampComponent,
    });
    popover.present();
  }
}
