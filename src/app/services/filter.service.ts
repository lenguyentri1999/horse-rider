import { Injectable } from '@angular/core';
import { Filter } from 'src/models/filter';
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
  defaultFilter: Filter = {
    distance: 500
  };

  currentSource = SourceEnum.HorseCamps;

  private currentCampFilter: BehaviorSubject<Filter> = new BehaviorSubject<Filter>(this.defaultFilter);

  private campFilters: CampSearchFormValues;
  private trailFilters: TrailSearchFormValues;

  constructor() {
  }

  setCampAttributesFilter(values: CampSearchFormValues) {
    this.campFilters = values;
  }

  getCampAttributesFilter(): CampSearchFormValues {
    return this.campFilters;
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

  getFilter(): Observable<Filter> {
    return this.currentCampFilter;
  }

  setFilter(filter: Filter): void {
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
