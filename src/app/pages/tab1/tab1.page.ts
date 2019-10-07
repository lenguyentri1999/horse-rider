import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { CampService } from '../../services/camp.service';
import { Camp } from 'src/models/camp';
import { Router, NavigationExtras } from '@angular/router';
import { NavController, IonSearchbar } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { MapboxService, CampQuery } from 'src/app/services/mapbox.service';
import { AutoCompleteComponent } from 'ionic4-auto-complete';
import { MapboxPlace } from 'src/models/mapboxResult';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Coords } from 'src/models/coords';
import { NavParamsService } from 'src/app/services/nav-params.service';
import { CampInfoPage } from '../camp-info/camp-info.page';

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

  constructor(
    public mapboxService: MapboxService,
    protected campService: CampService,
    protected router: Router,
    protected navCtrl: NavController,
    protected authService: AuthService,
    protected navParamService: NavParamsService,
  ) {
    // Get query from landing page
    this.query = this.mapboxService.getSearchQuery();

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
}
