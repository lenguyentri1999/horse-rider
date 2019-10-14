import * as mapboxgl from 'mapbox-gl';
import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { environment } from 'src/environments/environment';
import { of, Observable, Subject } from 'rxjs';
import { MapboxMap, MapboxMapOptions, MapboxSourceOptions } from 'src/models/mapboxMap';
import { MapboxPlace } from 'src/models/mapboxResult';

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
    this.initMap();

    this.onChanges.subscribe(changes => {
      console.log('le changes', changes);
      console.log(changes.geoJsonData.currentValue);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
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

      this.addSource(this.myMap);
      this.resizeMap(this.myMap);
    }
    return of(this.myMap);
  }


  private resizeMap(myMap: MapboxMap) {
    this.isMapLoaded(myMap).then(mapLoaded => {
      mapLoaded.resize();
    });
  }

  private addSource(myMap: MapboxMap) {
    this.isMapLoaded(myMap).then(mapLoaded => {
      const sourceOptions: MapboxSourceOptions = {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      };

      const geoJsonData: MapboxSourceOptions['data'] = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            place_name: 'Warwick camp',
            properties: {
              title: 'Le warwick camp',
              description: 'le description'
            },
            geometry: {
              type: 'Point',
              coordinates: [-72.35642, 42.626282]
            }
          }
        ]
      };

      mapLoaded.addSource(this.sourceName, sourceOptions);
      mapLoaded.getSource(this.sourceName).setData(geoJsonData);

      // make a marker for each feature and add to the map
      const coords = geoJsonData.features[0].geometry.coordinates;
      const marker = new mapboxgl.Marker()
        .setLngLat(coords);
      // marker.setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        // .setHTML('<h3>' + 'Le title' + '</h3>'));
      marker.addTo(mapLoaded);
    });
  }

  private isMapLoaded(myMap: MapboxMap): Promise<MapboxMap> {
    return new Promise((resolve, reject) => {
      myMap.on('load', () => resolve(myMap));
      myMap.on('error', () => reject(myMap));
    });
  }
}
