import { Component, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mapboxgl-map',
  templateUrl: './mapboxgl-map.component.html',
  styleUrls: ['./mapboxgl-map.component.scss'],
})

export class MapboxglMapComponent implements OnInit {
  campMaps: any;

  constructor() { }

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    const options: MapboxMapOptions = {
      container: 'mapboxMap',
      style: 'mapbox://styles/lenguyentri1999/ck1nswdml15w61coc8hv8xpmc'
    };
    this.campMaps = new mapboxgl.Map(options);
    this.campMaps.on('load', () => this.onMapLoad());
  }

  private onMapLoad() {
    console.log('map loaded event');
    this.campMaps.resize();
  }

}

interface MapboxMapOptions {
  container: string | HTMLElement;
  style: string;
}
