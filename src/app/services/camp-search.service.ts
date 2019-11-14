import { Injectable } from '@angular/core';
import { AutoCompleteService } from 'ionic4-auto-complete';
import { Camp } from 'src/models/camp';
import { CampService } from './camp.service';
import { map, flatMap, combineLatest, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CampSearchService implements AutoCompleteService {
  readonly numNonDefaultResults: number = 2;

  constructor(
    protected campService: CampService,
  ) { }

  getResults(term: string) {
    return this.campService.getAllAsList().pipe(
      map(camps => camps.filter(camp => camp.name.toLowerCase().indexOf(term.toLowerCase()) > -1)),
      map(camps => camps.slice(0, this.numNonDefaultResults)),
      map(camps => camps.map(camp => this.convertCampToSearchResult(camp))),
      map(searchResults => {
        if (term.trim() !== '') {
          return searchResults;
        } else {
          return this.getDefaultSearchResults().concat(searchResults);
        }
      }),
    );
  }

  getItemLabel?(item: SearchResult) {
    return item.name;
  }

  getDefaultSearchResults(): SearchResult[] {
    const exploreCamps: SearchResult = {
      name: 'Explore Camps',
      navigateTo: ['/tabs/places/camps'],
      isDefault: true
    };

    const exploreTrails: SearchResult = {
      name: 'Explore Trails',
      navigateTo: ['/tabs/places/trails'],
      isDefault: true
    };

    return [exploreCamps, exploreTrails];
  }

  convertCampToSearchResult(camp: Camp) {
    const searchResult: SearchResult = {
      name: camp.name,
      id: camp.id,
      photoUrl: camp.pictures && camp.pictures.length > 0 ? camp.pictures[0] : '',
      isDefault: false,
      navigateTo: [`/camp-info`, camp.id]
    };
    return searchResult;
  }

}

export interface SearchResult {
  name: string;
  id?: string;
  photoUrl?: string;
  isDefault: boolean;
  navigateTo: Array<string>;
}
