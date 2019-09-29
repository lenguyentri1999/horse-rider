import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AutoCompleteService } from 'ionic4-auto-complete';
import { MapboxResult, MapboxPlace } from '../../models/mapboxResult';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MapboxService implements AutoCompleteService {
  private baseUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places`;

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

  async findMe(): Promise<{lat: number; long: number}> {
    if (navigator.geolocation) {
      const pos = await this.getPosition();
      return {
        lat: pos.coords.latitude,
        long: pos.coords.longitude
      };
    }
  }

  private getPosition(options?): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

}
