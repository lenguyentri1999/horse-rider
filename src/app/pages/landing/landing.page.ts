import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MapboxService } from 'src/app/services/mapbox.service';
import { MapboxPlace } from 'src/models/mapboxResult';
import { Router } from '@angular/router';
import { AutoCompleteComponent } from 'ionic4-auto-complete';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { CampSearchService, SearchResult } from 'src/app/services/camp-search.service';
import { TrailSearchFormValues } from 'src/app/components/trail-search-form/trail-search-form.component';
import { CampSearchFormValues } from 'src/app/components/camp-search-form/camp-search-form.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})

export class LandingPage implements OnInit, AfterViewInit {
  @ViewChild('textSearch', {static: false}) searchBar: AutoCompleteComponent;
  @ViewChild('locationSearchBar', {static: false}) locationSearchBar: AutoCompleteComponent;
  environmentSetting: boolean = environment.production;
  environmentVersion: string = environment.version;


  place: MapboxPlace;

  constructor(
    public mapboxService: MapboxService,
    public campSearchService: CampSearchService,
    protected router: Router,
    protected navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // Populate default
    this.mapboxService.getDefaultPlace().subscribe(place => {
      this.locationSearchBar.keyword = place.place_name;
      this.place = place;
    });
  }

  onLocationSelected(place: MapboxPlace) {
    this.place = place;
  }

  onCampSelected(camp: SearchResult) {
    this.router.navigate(camp.navigateTo);
  }

  searchCamps() {
    this.mapboxService.setSearchQuery({term: this.searchBar.keyword, place: this.place});
    this.router.navigate(['tabs/places/camps']);
  }

  onSearchTrails(values: TrailSearchFormValues) {
    console.log(values);
  }

  onSearchCamps(values: CampSearchFormValues) {
    console.log(values);
  }
}
