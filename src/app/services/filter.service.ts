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

  private trailFilters: TrailSearchFormValues;

  constructor() {
  }

  setCampAttributesFilter(values: CampSearchFormValues) {
    this.campAttributesFilter.next(values);
  }

  getCampAttributesFilter(): Observable<CampSearchFormValues> {
    return this.campAttributesFilter;
  }

  setTrailAttributesFilter(values: TrailSearchFormValues) {
    this.trailFilters = values;
  }

  getTrailAttributesFilter(): TrailSearchFormValues {
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
      facilityCleanliness: values.facilityCleanliness,
      horseFacilities: values.horseFacilities,
      wifi: values.wifi,
    };

    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        results = results.filter(camp => camp.attributes[key]);
      }
    });

    return results;
}

todo(camps$: Observable < Camp[] >, values: CampSearchFormValues): Observable < Camp[] > {
  return camps$.pipe(
    first(),
    map(camps => {
      let results = camps;

      // Filter by name
      if (values.name.trim() !== '') {
        results = results.filter(camp => camp.name.indexOf(name) >= 0);
      }

      // Filter by attributes
      const filters: Camp['attributes'] = {
        bigRigFriendly: values.bigRigFriendly,
        facilityCleanliness: values.facilityCleanliness,
        horseFacilities: values.horseFacilities,
        wifi: values.wifi,
      };

      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          results = results.filter(camp => camp.attributes[key]);
        }
      });

      return results;
    })
  );
}

}
