import { Injectable } from '@angular/core';
import { Filter } from 'src/models/filter';
import { Subject, Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  defaultFilter: Filter = {
    distance: 500
  };

  private currentCampFilter: BehaviorSubject<Filter> = new BehaviorSubject<Filter>(this.defaultFilter);

  constructor() {
  }

  getCampFilter(): Observable<Filter> {
    return this.currentCampFilter;
  }

  setCampFilter(filter: Filter): void {
    this.currentCampFilter.next(filter);
  }

}
