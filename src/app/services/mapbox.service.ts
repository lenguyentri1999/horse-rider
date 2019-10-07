import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AutoCompleteService } from 'ionic4-auto-complete';
import { MapboxResult, MapboxPlace } from '../../models/mapboxResult';
import { map } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { Coords } from 'src/models/coords';

@Injectable({
  providedIn: 'root'
})

export class MapboxService implements AutoCompleteService {
  baseUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places`;
  currentQuery: CampQuery = {
    term: '',
    place: null,
  };

  constructor(
    protected http: HttpClient,
  ) { }

  // AutocompleteService interface
  getResults(term: any) {
    return this.autocomplete(term);
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

  public reverseGeocode(address: string): Observable<{ long: number, lat: number }> {
    return this.autocomplete(address).pipe(
      map(features => {
        if (features.length === 0) {
          return null;
        } else {
          return {
            long: features[0].geometry.coordinates[0],
            lat: features[0].geometry.coordinates[1]
          };
        }
      })
    );
  }

  public straightLineDistance(
    coordsOne$: Observable<Coords>,
    coordsTwo$: Observable<Coords>,
    unit: string = null
  ): Observable<number> {
    return forkJoin(coordsOne$, coordsTwo$).pipe(
      map(coordsList => {
        const coordsOne = coordsList[0];
        const coordsTwo = coordsList[1];
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
      })
    );
  }

async findMe(): Promise < { lat: number; long: number } > {
  const pos = await this.getPosition();
  return {
    lat: pos.coords.latitude,
    long: pos.coords.longitude
  };
}

  private getPosition(options ?): Promise < any > {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

}

export interface CampQuery {
  term: string;
  place: MapboxPlace;
}
