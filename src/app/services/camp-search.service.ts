import { Injectable } from '@angular/core';
import { AutoCompleteService } from 'ionic4-auto-complete';
import { Camp } from 'src/models/camp';
import { CampService } from './camp.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CampSearchService implements AutoCompleteService {
  readonly numResults: number = 3;

  getResults(term: any) {
    return this.campService.getAllAsList().pipe(
      map(camps => camps.filter(camp => camp.name.toLowerCase().indexOf(term.toLowerCase()) > -1)),
      map(camps => camps.slice(0, this.numResults))
    );
  }

  getItemLabel?(item: Camp) {
    return item.name;
  }

  constructor(
    protected campService: CampService,
  ) { }
}
