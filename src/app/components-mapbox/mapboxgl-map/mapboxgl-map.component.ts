import * as mapboxgl from 'mapbox-gl';
import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { environment } from 'src/environments/environment';
import { of, Observable, Subject, combineLatest, forkJoin } from 'rxjs';
import { MapboxMap, MapboxMapOptions } from 'src/models/mapboxMap';
import { MapboxPlace } from 'src/models/mapboxResult';
import { tap, flatMap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-mapboxgl-map',
  templateUrl: './mapboxgl-map.component.html',
  styleUrls: ['./mapboxgl-map.component.scss'],
})

export class MapboxglMapComponent implements OnInit, OnChanges {
  @Input() centerCoords: number[];
  @Input() zoomLevel: number;
  @Input() geoJsonData: MapboxPlace[];

  defaultZoomLevel = 3;
  sourceName = 'customSource';

  onChanges = new Subject<SimpleChanges>();
  myMap: MapboxMap;

  constructor() { }

  ngOnInit() {
    mapboxgl.accessToken = environment.mapboxKey;

    this.onChanges.pipe(
      switchMap(changes => {
        return forkJoin(of(changes), this.initMap());
      }),
      tap(tup => {
        const changes = tup[0];
        const myMap = tup[1];
        if (changes.geoJsonData && changes.geoJsonData.currentValue) {
          this.populateMarkers(myMap, changes.geoJsonData.currentValue);
        }
      })
    ).subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.onChanges.next(changes);
  }

  initMap(): Observable<MapboxMap> {
    if (!(this.myMap)) {
      const options: MapboxMapOptions = {
        container: 'mapboxMap',
        style: 'mapbox://styles/lenguyentri1999/ck1nswdml15w61coc8hv8xpmc',
      };
      this.myMap = new mapboxgl.Map(options);
      this.myMap.setZoom(this.zoomLevel || this.defaultZoomLevel);
      this.myMap.setCenter([-98.56, 39.66]); // center of the United States

      this.resizeMap(this.myMap);
    }
    return of(this.myMap);
  }


  private resizeMap(myMap: MapboxMap) {
    this.isMapLoaded(myMap).then(mapLoaded => {
      mapLoaded.resize();
    });
  }

  private populateMarkers(myMap: MapboxMap, geoJsonData: MapboxPlace[]) {
    this.isMapLoaded(myMap).then(mapLoaded => {
      // make a marker for each feature and add to the map
      geoJsonData.forEach(place => {
        console.log(place);
        const coords = place.geometry.coordinates;
        const marker = new mapboxgl.Marker()
          .setLngLat(coords);
        marker.setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML('<h3>' + place.properties.title + '</h3>'));
        marker.addTo(mapLoaded);

      });
    });
  }

  private isMapLoaded(myMap: MapboxMap): Promise<MapboxMap> {
    return new Promise((resolve, reject) => {
      myMap.on('load', () => resolve(myMap));
      // myMap.on('error', () => reject(myMap));
    });
  }
}
