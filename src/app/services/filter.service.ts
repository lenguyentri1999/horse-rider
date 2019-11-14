import { Injectable } from '@angular/core';
import { Filter } from 'src/models/filter';
import { Subject, Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SourceEnum } from './camp.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  defaultFilter: Filter = {
    distance: 500
  };

  currentSource = SourceEnum.HorseCamps;

  private currentCampFilter: BehaviorSubject<Filter> = new BehaviorSubject<Filter>(this.defaultFilter);

  constructor() {
  }

  setSource(sourceEnum: SourceEnum) {
    this.currentSource = sourceEnum;
  }

  getFilter(): Observable<Filter> {
    return this.currentCampFilter;
  }

  setFilter(filter: Filter): void {
    this.currentCampFilter.next(filter);
  }

}
