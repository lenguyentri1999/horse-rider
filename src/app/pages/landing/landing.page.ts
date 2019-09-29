import { Component, OnInit } from '@angular/core';
import { MapboxService } from 'src/app/services/mapbox.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  location: {lat: number; long: number};

  constructor(
    protected mapboxService: MapboxService
  ) { }

  ngOnInit() {
  }

  async onLocationSearchFocus($event) {
    this.location = await this.mapboxService.findMe();
  }

}
