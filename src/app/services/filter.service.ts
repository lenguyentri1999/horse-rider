import { Injectable } from '@angular/core';
import { CommonFilter } from 'src/models/filter';
import { Subject, Observable, of, BehaviorSubject } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { SourceEnum } from './camp.service';
import { CampSearchFormValues } from '../components/camp-search-form/camp-search-form.component';
import { Camp } from 'src/models/camp';
import { TrailSearchFormValues } from '../components/trail-search-form/trail-search-form.component';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  defaultFilter: CommonFilter = {
    distance: 500
  };

  currentSource = SourceEnum.HorseCamps;

  private currentCampFilter: BehaviorSubject<CommonFilter> = new BehaviorSubject<CommonFilter>(this.defaultFilter);

  private campAttributesFilter: BehaviorSubject<CampSearchFormValues> = new BehaviorSubject<CampSearchFormValues>(null);

  private trailFilters: BehaviorSubject<TrailSearchFormValues> = new BehaviorSubject<TrailSearchFormValues>(null);

  constructor() {
  }

  setCampAttributesFilter(values: CampSearchFormValues) {
    this.campAttributesFilter.next(values);
  }

  getCampAttributesFilter(): Observable<CampSearchFormValues> {
    return this.campAttributesFilter;
  }

  setTrailAttributesFilter(values: TrailSearchFormValues) {
    this.trailFilters.next(values);
  }

  getTrailAttributesFilter(): Observable<TrailSearchFormValues> {
    return this.trailFilters;
  }

  setSource(sourceEnum: SourceEnum) {
    this.currentSource = sourceEnum;
  }

  getFilter(): Observable<CommonFilter> {
    return this.currentCampFilter;
  }

  setFilter(filter: CommonFilter): void {
    this.currentCampFilter.next(filter);
  }

  filterCampsByAttributes(camps: Camp[], values: CampSearchFormValues): Camp[] {
    let results = camps;

    // Filter by name
    if (values.name.trim() !== '') {
      results = results.filter(camp => camp.name.indexOf(name) >= 0);
    }

    // Filter by attributes
    const filters: Camp['attributes'] = {
      bigRigFriendly: values.bigRigFriendly,
      petFriendly: values.petFriendly,
      wifi: values.wifi,
    };

    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        results = results.filter(camp => camp.attributes[key]);
      }
    });

    return results;
  }

  public filterTrailsByAttributes(camps: Camp[], values: TrailSearchFormValues) {
    let results = camps;

    // Filter by name
    if (values.name.trim() !== '') {
      results = results.filter(camp => camp.name.indexOf(name) >= 0);
    }

    // Filter by attributes
    const filters: Camp['attributes'] = {
      bridges: values.bridges,
      parking: values.parking,
      difficulty: values.difficulty,
      footing: values.footing,
      waterCrossings: values.waterCrossings
    };

    Object.keys(filters).forEach(key => {
      if (filters[key] && filters[key].trim() !== '') {
        results = results.filter(camp => camp.attributes[key] === filters[key]);
      }
    });

    return results;
  }

}
