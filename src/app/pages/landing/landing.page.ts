import { Component, OnInit, ViewChild } from '@angular/core';
import { MapboxService } from 'src/app/services/mapbox.service';
import { MapboxPlace } from 'src/models/mapboxResult';
import { Router } from '@angular/router';
import { AutoCompleteComponent } from 'ionic4-auto-complete';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})

export class LandingPage implements OnInit {
  @ViewChild('textSearch', {static: false}) searchBar: AutoCompleteComponent;
  environmentSetting: boolean = environment.production;

  place: MapboxPlace;
  // tslint:disable-next-line:no-inferrable-types
  searchTerm: string = '';

  constructor(
    public mapboxService: MapboxService,
    protected router: Router,
    protected navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  onLocationSelected(place: MapboxPlace) {
    this.place = place;
  }

  searchCamps() {
    this.searchTerm = this.searchBar.keyword;
    this.mapboxService.setSearchQuery({term: this.searchTerm, place: this.place});
    this.router.navigateByUrl('tabs/tab1');
  }
}
