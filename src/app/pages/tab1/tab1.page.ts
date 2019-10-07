import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { CampService } from '../../services/camp.service';
import { Camp } from 'src/models/camp';
import { Router, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { MapboxService, CampQuery } from 'src/app/services/mapbox.service';
import { AutoCompleteComponent } from 'ionic4-auto-complete';
import { MapboxPlace } from 'src/models/mapboxResult';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit, AfterViewInit {
  @ViewChild('textSearch', { static: false }) textSearchBar: AutoCompleteComponent;
  @ViewChild('locationSearch', { static: false }) locationSearchBar: AutoCompleteComponent;

  camps: Observable<Camp[]>;
  query: CampQuery;

  constructor(
    protected campService: CampService,
    protected router: Router,
    protected navCtrl: NavController,
    protected authService: AuthService,
    protected mapboxService: MapboxService,
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
    this.locationSearchBar.setValue(this.query.place);
  }

  goToCampInfo(camp: Camp): void {
    const navExtras: NavigationExtras = {
      state: {
        camp
      }
    };
    this.navCtrl.navigateForward(`camp-info`, navExtras);
  }

  onLocationSelected(place: MapboxPlace): void {
    this.query.place = place;
  }

  searchCamps() {
    this.query.term = this.textSearchBar.keyword;
    this.camps = this.campService.getAllAsMap().pipe(
      map(camps => {
        return this.campService.filterByTerm(this.query.term, camps);
      })
    );
    // .subscribe();
  }
}
