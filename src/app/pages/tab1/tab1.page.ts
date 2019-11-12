import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { CampService, SourceEnum } from '../../services/camp.service';
import { Camp } from 'src/models/camp';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, IonSearchbar, ModalController, PopoverController, ToastController, IonContent } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { MapboxService, CampQuery, MapboxSearchResult } from 'src/app/services/mapbox.service';
import { AutoCompleteComponent } from 'ionic4-auto-complete';
import { MapboxPlace } from 'src/models/mapboxResult';
import { map, tap, switchMap } from 'rxjs/operators';
import { Observable, of, combineLatest, from, forkJoin } from 'rxjs';
import { Coords } from 'src/models/coords';
import { NavParamsService } from 'src/app/services/nav-params.service';
import { CampInfoPage } from '../camp-info/camp-info.page';
import { FilterModalComponent } from 'src/app/components/filter-modal/filter-modal.component';
import { SortPopoverComponent } from 'src/app/components/sort-popover/sort-popover.component';
import { CampSearchService, SearchResult } from 'src/app/services/camp-search.service';
import { Filter } from 'src/models/filter';
import { FilterService } from 'src/app/services/filter.service';
import { FirebaseTable } from 'src/models/firebase/statusTable';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit, AfterViewInit {
  @ViewChild('textSearch', { static: false }) textSearchBar: AutoCompleteComponent;
  @ViewChild('locationSearch', { static: false }) locationSearchBar: AutoCompleteComponent;
  @ViewChild(IonContent, { static: false }) content: IonContent;

  p = 1;
  itemsPerPage = 10;

  readonly filter: Observable<Filter>;
  readonly originalDataSource$: Observable<FirebaseTable<Camp>>;

  camps: Observable<Camp[]> = new Observable<Camp[]>();
  campsMarkers: Observable<MapboxPlace[]>;

  query: CampQuery = {
    place: null,
    term: ''
  };

  currentCoords: Observable<number[]>;

  isMapView = false;

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
  ) {

    this.originalDataSource$ = this.initQueryParams();
    this.filter = this.filterService.getCampFilter();
  }

  ngOnInit(): void {
  }

  initQueryParams(): Observable<FirebaseTable<Camp>> {
    return this.route.paramMap.pipe(
      switchMap(params => {
        const source = params.get('source');
        if (source === 'trails') {
          return this.campService.getDataSourceAsMap(SourceEnum.HorseTrails);
        } else {
          return this.campService.getDataSourceAsMap(SourceEnum.HorseCamps);
        }
      })
    );
  }

  ngAfterViewInit(): void {
    // Get query from landing page
    this.query = this.mapboxService.getSearchQuery();
    if (this.query.place) {
      this.currentCoords = of(this.query.place.geometry.coordinates);
      this.locationSearchBar.setValue(this.query.place);
      this.searchCamps();
    } else {
      this.mapboxService.getDefaultPlace().subscribe(place => {
        this.query.place = place;
        this.locationSearchBar.setValue(place);
        this.currentCoords = of(this.query.place.geometry.coordinates);
        this.searchCamps();
      });
    }

    this.textSearchBar.keyword = this.query.term;
    // this.locationSearchBar.setValue(this.query.place);
  }

  goToCampInfo(camp: Camp): void {
    this.navParamService.setParam(CampInfoPage, camp);
    this.navCtrl.navigateForward(`camp-info`);
  }

  onCampSelected(result: SearchResult): void {
    this.router.navigate(result.navigateTo);
  }

  async onLocateMeButtonClick() {
    const coords = await this.mapboxService.findMe();
    this.currentCoords = of([coords.long, coords.lat]);

    this.mapboxService.reverseGeocode(coords).subscribe(place => {
      this.query.place = place;
      this.locationSearchBar.keyword = place.place_name;
      this.searchCamps();
    });
  }

  async onLocationSelected(result: MapboxSearchResult) {
    this.query.place = result.place;
    this.currentCoords = of(this.query.place.geometry.coordinates);
  }

  searchCamps() {
    let hashMap$ = this.originalDataSource$;

    if (this.query.place) {
      const currCoords: Coords = {
        long: this.query.place.geometry.coordinates[0],
        lat: this.query.place.geometry.coordinates[1]
      };

      hashMap$ = this.filterByPlace(hashMap$, currCoords);
    }

    this.query.term = this.textSearchBar.keyword;
    this.camps = hashMap$.pipe(
      map(allCamps => {
        if (Object.entries(allCamps).length === 0) {
          return [];
        }
        return this.campService.filterByTerm(this.query.term, allCamps);
      })
    );

    this.campsMarkers = this.camps.pipe(
      map(camps => this.sliceCampByPage(camps)),
      map(camps => {
        return camps.map(camp => this.mapboxService.campToMapboxPlace(camp));
      })
    );

    this.p = 1;
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

  async onFilterButtonClick() {
    const popover = await this.popoverCtrl.create({
      component: FilterModalComponent,
    });
    await popover.present();
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
}
