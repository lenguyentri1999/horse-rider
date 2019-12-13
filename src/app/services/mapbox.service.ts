import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AutoCompleteService } from 'ionic4-auto-complete';
import { MapboxResult, MapboxPlace } from '../../models/mapboxResult';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, forkJoin, of } from 'rxjs';
import { Coords } from 'src/models/coords';
import { Camp } from 'src/models/camp';

@Injectable({
  providedIn: 'root'
})

export class MapboxService implements AutoCompleteService {
  baseUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places`;
  currentQuery: CampQuery = {
    term: '',
    place: null,
  };

  private defaultAddress = 'San Francisco, California';

  constructor(
    protected http: HttpClient,
  ) { }

  getDefaultPlace(): Observable<MapboxPlace> {
    const currCoords: string = localStorage.getItem('currLocation');
    if (currCoords) {
      return this.autocomplete(currCoords).pipe(
        map(features => features[0])
      );
    }
    return this.autocomplete(this.defaultAddress).pipe(
      map(features => features[0])
    );
  }

  // AutocompleteService interface
  getResults(term: string): Observable<MapboxSearchResult[]> {
    return this.autocomplete(term).pipe(
      map(mapboxPlaces => {
        const convertedMapboxPlaces = mapboxPlaces.map(place => {
          const result: MapboxSearchResult = {
            place_name: place.place_name,
            place,
            isDefault: false
          };
          return result;
        });
        return convertedMapboxPlaces;
      }),
    );
  }

  getItemLabel?(item: MapboxPlace) {
    return item.place_name;
  }
  // End of interface implementation

  public setSearchQuery(query: CampQuery) {
    this.currentQuery = query;
  }

  public getSearchQuery(): CampQuery {
    return this.currentQuery;
  }

  autocomplete(query: string): Observable<MapboxPlace[]> {
    // if (!query && !query.trim()) { return of(null); }
    const url = `${this.baseUrl}/${query}.json`;

    return this.http.get(url, {
      params: {
        access_token: environment.mapboxKey
      }
    })
      .pipe(
        map((result: MapboxResult) => {
          return result.features;
        })
      );
  }

  public forwardGeocodeToCoords(address: string): Observable<{ long: number, lat: number }> {
    return this.forwardGeocode(address).pipe(
      map(feature => {
        return {
          long: feature.geometry.coordinates[0],
          lat: feature.geometry.coordinates[1]
        };
      })
    )
  }

  public forwardGeocode(address: string): Observable<MapboxPlace> {
    return this.autocomplete(address).pipe(
      catchError(err => {
        console.log(err);
        console.log('Wrong address:', address);
        return of([]);
      }),

      map(features => {
        if (features.length === 0) {
          return [];
        } else {
          return features[0];
        }
      })
    );

  }


  public reverseGeocode(coords: { long: number, lat: number }): Observable<MapboxPlace> {
    const query = `${coords.long}, ${coords.lat}`;
    return this.autocomplete(query).pipe(
      map(features => features.length > 0 ? features[0] : null),
      tap(features =>
        console.log('features', features)
      )
    );
  }

  public straightLineDistance(
    coordsOne: Coords,
    coordsTwo: Coords,
    unit: string = null
  ): number {
    const lon1 = coordsOne.long;
    const lat1 = coordsOne.lat;
    const lon2 = coordsTwo.long;
    const lat2 = coordsTwo.lat;

    if ((lat1 === lat2) && (lon1 === lon2)) {
      return 0;
    } else {
      const radlat1 = Math.PI * lat1 / 180;
      const radlat2 = Math.PI * lat2 / 180;
      const theta = lon1 - lon2;
      const radtheta = Math.PI * theta / 180;
      let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit === 'K') { dist = dist * 1.609344; }
      if (unit === 'N') { dist = dist * 0.8684; }
      return dist;
    }
  }

  public campToMapboxPlace(camp: Camp): MapboxPlace {
    const mapboxPlace: MapboxPlace = {
      type: 'Feature',
      place_name: camp.name,
      geometry: {
        type: 'Point',
        coordinates: [camp.coords.long, camp.coords.lat],
      },
      properties: {
        title: camp.name,
        description: ''
      }
    };
    return mapboxPlace;
  }

  async findMe(): Promise<{ lat: number; long: number }> {
    const pos = await this.getPosition();

    localStorage.setItem('currLocation', `${pos.coords.longitude}, ${pos.coords.latitude}`);

    return {
      lat: pos.coords.latitude,
      long: pos.coords.longitude
    };
  }

  private getPosition(options?): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

}

export interface CampQuery {
  term: string;
  place: MapboxPlace;
}

export interface MapboxSearchResult {
  place_name: string;
  isDefault: boolean;
  place?: MapboxPlace;
}
