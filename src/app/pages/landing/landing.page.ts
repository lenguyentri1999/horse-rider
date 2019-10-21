import { Component, OnInit, ViewChild } from '@angular/core';
import { MapboxService } from 'src/app/services/mapbox.service';
import { MapboxPlace } from 'src/models/mapboxResult';
import { Router } from '@angular/router';
import { AutoCompleteComponent } from 'ionic4-auto-complete';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { CampSearchService } from 'src/app/services/camp-search.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})

export class LandingPage implements OnInit {
  @ViewChild('textSearch', {static: false}) searchBar: AutoCompleteComponent;
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

  onLocationSelected(place: MapboxPlace) {
    this.place = place;
  }

  searchCamps() {
    this.mapboxService.setSearchQuery({term: this.searchBar.keyword, place: this.place});
    this.router.navigate(['tabs/tab1']);
  }
}
