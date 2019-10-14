import * as mapboxgl from 'mapbox-gl';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-mapboxgl-map',
  templateUrl: './mapboxgl-map.component.html',
  styleUrls: ['./mapboxgl-map.component.scss'],
})

export class MapboxglMapComponent implements OnInit, OnChanges {
  @Input() centerCoords: number[];

  myMap: any;

  constructor() { }

  ngOnInit() {
    mapboxgl.accessToken = environment.mapboxKey;
    this.initMap();
  }

  initMap(): Observable<MapboxMap> {
    if (!(this.myMap)) {
      const options: MapboxMapOptions = {
        container: 'mapboxMap',
        style: 'mapbox://styles/lenguyentri1999/ck1nswdml15w61coc8hv8xpmc',
      };
      this.myMap = new mapboxgl.Map(options);
      this.myMap.setZoom(3);
      this.myMap.setCenter([-98.56, 39.66]); // center of the United States
      this.resizeMap(this.myMap);
    }
    return of(this.myMap);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const center = changes.centerCoords.currentValue;
    console.log(center);
    // this.myMap.setZoom(15);
    // this.myMap.setCenter(changes.centerCoords.currentValue);
    // console.log(this.myMap.getCenter());
  }

  private resizeMap(myMap: MapboxMap) {
    this.isMapLoaded(myMap).then(mapLoaded => {
      mapLoaded.resize();
    });
  }

  private isMapLoaded(myMap: MapboxMap): Promise<MapboxMap> {
    return new Promise((resolve, reject) => {
      myMap.on('load', () => resolve(myMap));
      myMap.on('error', () => reject(myMap));
    });
  }
}

interface MapboxMap {
  setCenter(center: number[]);
  flyTo(option: MapboxMapOptions);
  getCenter(): number[];
  on(event: string, action: any);
  resize();
}

interface MapboxMapOptions {
  container?: string | HTMLElement;
  style?: string;
  center?: number[];
  zoom?: number;
}
