import * as mapboxgl from 'mapbox-gl';
import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { of, Observable, Subject, combineLatest, forkJoin } from 'rxjs';
import { MapboxMap, MapboxMapOptions, MapboxSourceOptions } from 'src/models/mapboxMap';
import { MapboxPlace, MapboxSource } from 'src/models/mapboxResult';
import { tap, flatMap, switchMap } from 'rxjs/operators';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-mapboxgl-map',
  templateUrl: './mapboxgl-map.component.html',
  styleUrls: ['./mapboxgl-map.component.scss'],
})

export class MapboxglMapComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('mapboxMap', { static: false }) mapDiv: { nativeElement: HTMLDivElement };
  @Input() centerCoords: number[];
  @Input() zoomLevel: number;
  @Input() geoJsonData: MapboxPlace[];

  isMapShown = true;
  readonly mapID: string;

  defaultZoomLevel = 3;
  sourceName = 'customSource';

  onChanges = new Subject<SimpleChanges>();
  myMap: MapboxMap;

  markers: any[] = [];

  constructor(
    protected db: DbService,
  ) {
    this.mapID = this.db.uuidv4();
  }

  ngAfterViewInit() {
    this.initMap();
  }

  ngOnInit() {
    mapboxgl.accessToken = environment.mapboxKey;
    // this.initMap().pipe(
    //   tap(myMap => {
    //     this.populateMarkers(myMap, this.geoJsonData);
    //   })
    // )
    // .subscribe();

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
        container: this.mapID,
        style: 'mapbox://styles/lenguyentri1999/ck1nswdml15w61coc8hv8xpmc',
      };
      this.myMap = new mapboxgl.Map(options);
      this.myMap.setZoom(this.zoomLevel || this.defaultZoomLevel);
      this.myMap.setCenter([-98.56, 39.66]); // center of the United States

      this.resizeMap(this.myMap);
    }
    return of(this.myMap);
  }


  private async resizeMap(myMap: MapboxMap) {
    this.isMapLoaded(myMap).then(mapLoaded => {
      mapLoaded.resize();
    });
  }

  private async removeAllMarkers() {
    this.markers.forEach(marker => marker.remove());
  }

  private async populateMarkers(myMap: MapboxMap, geoJsonData: MapboxPlace[]) {
    await this.removeAllMarkers();

    const sourceName = 'CampData';


    // myMap.addSource('earthquakes', {
    //   type: 'geojson',
    //   // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
    //   // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
    //   data: source,
    //   cluster: true,
    //   clusterMaxZoom: 14, // Max zoom to cluster points on
    //   clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    // })

    const options: MapboxSourceOptions = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: geoJsonData
      },
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 50,
    };

    myMap.addSource(sourceName, options);
    myMap.addLayer({
      id: 'clusters',
      type: 'circle',
      source: sourceName,
      filter: ['has', 'point_count'],
      paint: {
        // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
        // with three steps to implement three types of circles:
        //   * Blue, 20px circles when point count is less than 100
        //   * Yellow, 30px circles when point count is between 100 and 750
        //   * Pink, 40px circles when point count is greater than or equal to 750
        'circle-color': [
          'step',
          ['get', 'point_count'],
          '#51bbd6',
          100,
          '#f1f075',
          750,
          '#f28cb1'
        ],
        'circle-radius': [
          'step',
          ['get', 'point_count'],
          20,
          100,
          30,
          750,
          40
        ]
      }
    });

    myMap.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: sourceName,
      filter: ['has', 'point_count'],
      layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12
      }
    });

    myMap.addLayer({
      id: 'unclustered-point',
      type: 'circle',
      source: sourceName,
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': '#11b4da',
        'circle-radius': 8,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#fff'
      }
    });

    // inspect a cluster on click
    myMap.on('click', 'clusters', function (e) {
      var features = myMap.queryRenderedFeatures(e.point, {
        layers: ['clusters']
      });
      var clusterId = features[0].properties.cluster_id;
      myMap.getSource(sourceName).getClusterExpansionZoom(
        clusterId,
        function (err, zoom) {
          if (err) return;

          myMap.easeTo({
            center: features[0].geometry.coordinates,
            zoom: zoom
          });
        }
      );
    });

    myMap.on('click', 'unclustered-point', function (e) {
      const feature: MapboxPlace = e.features[0];
      feature.properties.id
      // console.log(e);
      new mapboxgl.Popup({ offset: 25 }) 
      .setLngLat(feature.geometry.coordinates)
      .setHTML(`<a href='camp-info/${feature.properties.id}'>` + feature.properties.title + '</a>')
      .addTo(myMap);

    })

    myMap.on('mouseenter', 'clusters', function () {
      myMap.getCanvas().style.cursor = 'pointer';
    });
    myMap.on('mouseleave', 'clusters', function () {
      myMap.getCanvas().style.cursor = '';
    });


    // make a marker for each feature and add to the map
    // geoJsonData.forEach(place => {
    //   // console.log(place);
    //   const coords = place.geometry.coordinates;
    //   const marker = new mapboxgl.Marker()
    //     .setLngLat(coords);
    //   marker.setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    //     .setHTML(`<a href='camp-info/${place.properties.id}'>` + place.properties.title + '</a>'));
    //   marker.addTo(myMap);
    //   this.markers.push(marker);
    // });
  }

  private isMapLoaded(myMap: MapboxMap): Promise<MapboxMap> {
    return new Promise((resolve, reject) => {
      myMap.on('load', () => resolve(myMap));
      myMap.on('error', () => reject(myMap));
    });
  }
}
