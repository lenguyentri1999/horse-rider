import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { CampService } from '../../services/camp.service';
import { Camp } from 'src/models/camp';
import { Router } from '@angular/router';
import { NavController, IonSearchbar, ModalController, PopoverController, ToastController, IonContent } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { MapboxService, CampQuery } from 'src/app/services/mapbox.service';
import { AutoCompleteComponent } from 'ionic4-auto-complete';
import { MapboxPlace } from 'src/models/mapboxResult';
import { map, tap, flatMap } from 'rxjs/operators';
import { Observable, of, combineLatest } from 'rxjs';
import { Coords } from 'src/models/coords';
import { NavParamsService } from 'src/app/services/nav-params.service';
import { CampInfoPage } from '../camp-info/camp-info.page';
import { FilterModalComponent } from 'src/app/components/filter-modal/filter-modal.component';
import { SortPopoverComponent } from 'src/app/components/sort-popover/sort-popover.component';
import { CampSearchService } from 'src/app/services/camp-search.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit, AfterViewInit {
  @ViewChild('textSearch', { static: false }) textSearchBar: AutoCompleteComponent;
  @ViewChild('locationSearch', { static: false }) locationSearchBar: AutoCompleteComponent;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  p: number;

  camps: Observable<Camp[]> = new Observable<Camp[]>();
  campsMarkers: Observable<MapboxPlace[]>;

  query: CampQuery;
  currentCoords: Observable<number[]>;

  isMapView = false;

  constructor(
    public mapboxService: MapboxService,
    public campSearchService: CampSearchService,
    protected campService: CampService,
    protected router: Router,
    protected navCtrl: NavController,
    protected authService: AuthService,
    protected navParamService: NavParamsService,
    protected modalCtrl: ModalController,
    protected popoverCtrl: PopoverController,
    protected toastCtrl: ToastController,
  ) {

    // Get query from landing page
    this.query = this.mapboxService.getSearchQuery();
    if (this.query.place) { this.currentCoords = of(this.query.place.geometry.coordinates); }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.textSearchBar.keyword = this.query.term;
    this.locationSearchBar.setValue(this.query.place);
    this.searchCamps();
  }

  goToCampInfo(camp: Camp): void {
    this.navParamService.setParam(CampInfoPage, camp);
    this.navCtrl.navigateForward(`camp-info`);
  }

  onCampSelected(camp: Camp): void {
  }

  onLocationSelected(place: MapboxPlace): void {
    this.query.place = place;
    this.currentCoords = of(this.query.place.geometry.coordinates);
  }

  searchCamps() {
    this.query.term = this.textSearchBar.keyword;
    this.camps = this.campService.getAllAsMap().pipe(
      map(allCamps => this.campService.filterByTerm(this.query.term, allCamps))
    );

    if (this.query.place) {
      const currCoords: Coords = {
        long: this.query.place.geometry.coordinates[0],
        lat: this.query.place.geometry.coordinates[1]
      };
      this.filterByPlace(currCoords);
    }
    this.p = 1;
  }

  private filterByPlace(currCoords: Coords) {
    this.camps = this.camps.pipe(
      tap(camps => {
        camps.forEach(camp => {
          this.populateCampCoordsAndDistance(camp, currCoords);
        });
      })
    );
  }

  private populateCampCoordsAndDistance(camp: Camp, currCoords: Coords) {
    camp.coords = this.mapboxService.reverseGeocode(camp.address);
    camp.distance = this.mapboxService.straightLineDistance(
      of(currCoords), camp.coords
    );
  }

  async onFilterButtonClick() {
    const modal = await this.modalCtrl.create({ component: FilterModalComponent });
    await modal.present();
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
      this.campsMarkers = this.camps.pipe(
        flatMap(camps => {
          const markers$: Observable<MapboxPlace>[] = [];
          camps.forEach(camp => {
            const place = this.mapboxService.campToMapboxPlace(camp);
            markers$.push(place);
          });

          return combineLatest(markers$);
        })
      );
    }
  }

  onPageChange(page: number) {
    this.p = page;
    if (this.content) {
      this.content.scrollToTop();
    }
  }
}
