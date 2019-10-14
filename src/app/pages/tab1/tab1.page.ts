import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { CampService } from '../../services/camp.service';
import { Camp } from 'src/models/camp';
import { Router, NavigationExtras } from '@angular/router';
import { NavController, IonSearchbar, ModalController, PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { MapboxService, CampQuery } from 'src/app/services/mapbox.service';
import { AutoCompleteComponent } from 'ionic4-auto-complete';
import { MapboxPlace } from 'src/models/mapboxResult';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Coords } from 'src/models/coords';
import { NavParamsService } from 'src/app/services/nav-params.service';
import { CampInfoPage } from '../camp-info/camp-info.page';
import { FilterModalComponent } from 'src/app/components/filter-modal/filter-modal.component';
import { SortPopoverComponent } from 'src/app/components/sort-popover/sort-popover.component';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit, AfterViewInit {
  @ViewChild('textSearch', { static: false }) textSearchBar: IonSearchbar;
  @ViewChild('locationSearch', { static: false }) locationSearchBar: AutoCompleteComponent;

  camps: Observable<Camp[]>;
  query: CampQuery;
  currentCoords: Observable<number[]>;

  constructor(
    public mapboxService: MapboxService,
    protected campService: CampService,
    protected router: Router,
    protected navCtrl: NavController,
    protected authService: AuthService,
    protected navParamService: NavParamsService,
    protected modalCtrl: ModalController,
    protected popoverCtrl: PopoverController,
  ) {
    // Get query from landing page
    this.query = this.mapboxService.getSearchQuery();
    if (this.query.place) { this.currentCoords = of(this.query.place.geometry.coordinates); }

    // this.campService.getAll().subscribe(camps =>
    //   this.camps = camps
    // );
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.textSearchBar.value = this.query.term;
    this.locationSearchBar.setValue(this.query.place);
    if (this.query.place) {
      this.searchCamps();
    }
  }

  goToCampInfo(camp: Camp): void {
    this.navParamService.setParam(CampInfoPage, camp);
    this.navCtrl.navigateForward(`camp-info`);
  }

  onLocationSelected(place: MapboxPlace): void {
    this.query.place = place;
    this.currentCoords = of(this.query.place.geometry.coordinates);
  }

  searchCamps() {
    this.query.term = this.textSearchBar.value;
    const currCoords: Coords = {
      long: this.query.place.geometry.coordinates[0],
      lat: this.query.place.geometry.coordinates[1]
    };

    this.camps = this.campService.getAllAsMap().pipe(
      map(camps => {
        return this.campService.filterByTerm(this.query.term, camps);
      }),
      tap(camps => {
        camps.forEach(camp => {
          camp.coords = this.mapboxService.reverseGeocode(camp.address);
          camp.distance = this.mapboxService.straightLineDistance(
            of(currCoords), camp.coords
          );
        });
      })
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
}
