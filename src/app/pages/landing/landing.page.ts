import { Component, OnInit } from '@angular/core';
import { MapboxService } from 'src/app/services/mapbox.service';
import { MapboxPlace } from 'src/models/mapboxResult';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(
    protected mapboxService: MapboxService,
    protected router: Router,
  ) { }

  ngOnInit() {
  }

  onLocationSelected(place: MapboxPlace) {
    this.router.navigate(['/tabs/tab1'], {state: {
      place,

    }});
  }

  // async onLocationSearchFocus($event) {
  //   this.location = await this.mapboxService.findMe();
  // }

}
