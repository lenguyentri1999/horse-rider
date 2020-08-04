import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Camp } from 'src/models/camp';
import { Observable, combineLatest, zip, from, of } from 'rxjs';
import { map, tap, flatMap, switchMap, take, catchError, filter, first } from 'rxjs/operators';
import * as stringSim from 'string-similarity';
import { StringMatch } from 'src/models/string-similarity/stringMatch';
import { MapboxService } from './mapbox.service';
import { FirebaseTable } from 'src/models/firebase/statusTable';
import { MapboxContext } from 'src/models/mapboxResult';

@Injectable({
  providedIn: 'root'
})
export class CampService {
  private basePath = 'camps';

  constructor(
    protected db: DbService,
    protected mapboxService: MapboxService,
  ) { }

  public tryAddNew(obj: Camp): Observable<boolean> {
    return from(this.db.updateObjectAtPath(`${this.basePath}/${obj.id}`, obj)).pipe(
      catchError(_ => of(false)),
      flatMap(_ => of(true))
    );
  }

  public delete(obj: Camp) {
    this.db.removeAtPath(`${this.basePath}/${obj.id}`)
    this.db.removeAtPath(`campsOrTrails/horseTrails/${obj.id}`)
    this.db.removeAtPath(`campsOrTrails/horseCamps/${obj.id}`)
  }

  public addToTrailTable(camp: Camp) {
    const obj = {
      [camp.id]: true
    };
    this.db.updateObjectAtPath(`campsOrTrails/horseTrails/`, obj);
  }

  public addToCampTable(camp: Camp) {
    const obj = {
      [camp.id]: true
    };
    this.db.updateObjectAtPath(`campsOrTrails/horseCamps/`, obj);
  }

  public getDataSourceAsMap(source: SourceEnum): Observable<FirebaseTable<Camp>> {
    switch (source) {
      case (SourceEnum.HorseCamps):
        return this.getAllHorseCampsAsMap();
      case (SourceEnum.HorseTrails):
        return this.getAllHorseTrailsAsMap();
    }
  }

  public isTrailById(campID: string): Observable<boolean> {
    return this.getAllHorseTrailsAsMap().pipe(
      map(trails =>
        trails.hasOwnProperty(campID)
      )
    );

  }

  public isTrail(camp: Camp): Observable<boolean> {
    return this.isTrailById(camp.id);
  }

  private getAllHorseCampsAsMap(): Observable<FirebaseTable<Camp>> {
    return this.getAllHorseCampsAsList().pipe(
      map(arr => {
        const obj = {};
        arr.forEach(ele => obj[ele.id] = ele);
        return obj;
      })
    );
  }

  public getAllHorseTrailsAsMap(): Observable<FirebaseTable<Camp>> {
    return this.getAllHorseTrailsAsList().pipe(
      map(arr => {
        const obj = {};
        arr.forEach(ele => obj[ele.id] = ele);
        return obj;
      })
    );
  }

  public getAllHorseCampsAsList(): Observable<Camp[]> {
    return this.getHorseCampsTable().pipe(
      flatMap(horseCamps => {
        const ids = Object.keys(horseCamps);
        const horseCamps$ = ids.map(id => this.getByID(id));
        return combineLatest(horseCamps$);
      }),
    );
  }

  public getAllHorseTrailsAsList(): Observable<Camp[]> {
    return this.getHorseTrailsTable().pipe(
      flatMap(trails => {
        const ids = Object.keys(trails);
        const trails$ = ids.map(id => this.getByID(id));
        return combineLatest(trails$);
      }),
    );
  }

  public getHorseCampsTable(): Observable<FirebaseTable<boolean>> {
    return this.db.getObjectValues<FirebaseTable<boolean>>(`campsOrTrails/horseCamps`);
  }

  public getHorseTrailsTable(): Observable<FirebaseTable<boolean>> {
    return this.db.getObjectValues<FirebaseTable<boolean>>(`campsOrTrails/horseTrails/`);
  }

  public getAllAsList(): Observable<Camp[]> {
    return this.db.getListSortedByFunction<Camp>(this.basePath);
  }

  public getByID(id: string): Observable<Camp> {
    return this.db.getObjectValues<Camp>(`${this.basePath}/${id}`).pipe(
      tap(camp => {
        // Populate camp city and state if camp does not have one yet
        if (camp.coords) {
          if (!camp.city || !camp.state) {
            this.setCampCityAndState(camp).subscribe();
          }
        } else {
          console.log('null camp', camp);
          this.setCampCoords(camp).subscribe();
        }
      }),
      first(),
    );
  }

  public setCampCoords(camp: Camp): Observable<{ long: number, lat: number }> {
    return this.mapboxService.forwardGeocodeToCoords(camp.address).pipe(
      tap(coords => {
        this.db.setObjectAtPath(`camps/${camp.id}/coords`, coords);
        return coords;
      })
    );
  }

  public setCampCityAndState(camp: Camp): Observable<any> {
    return this.mapboxService.reverseGeocode(camp.coords).pipe(
      tap(place => {
        const state = this.parseStateFromContext(place.context);
        const city = this.parseCityFromContext(place.context);

        if (state != null) {
          this.db.setObjectAtPath(`camps/${camp.id}/state`, state);
        }

        if (city != null) {
          this.db.setObjectAtPath(`camps/${camp.id}/city`, city);
        }

      })
    );
  }

  private parseStateFromContext(context: MapboxContext[]): string | null {
    if (!context || context.length < 2) {
      return null;
    }
    const stateContext = context[context.length - 2];
    if (!stateContext.id.startsWith('region')) {
      return null;
    }
    return stateContext.text;
  }

  private parseCityFromContext(context: MapboxContext[]): string | null {
    if (!context || context.length < 3) {
      return null;
    }
    const cityContext = context[context.length - 3];
    if (!cityContext.id.startsWith('place')) {
      return null;
    }
    return cityContext.text;
  }

  public filterByTerm(term: string, camps: FirebaseTable<Camp>): Camp[] {

    const campsArr = Object.keys(camps).map(id => camps[id]);

    const matches: { ratings: StringMatch[] } = stringSim.findBestMatch(term, campsArr.map(camp => this.campToStringSearch(camp)));

    // Sort each query by their rating in descending order and convert back to camps
    const sortedQueries = this.sortMatches(matches.ratings);
    const sortedCamps = sortedQueries
      .map(query => this.stringSearchToCampId(query.target))
      .map(id => camps[id]);
    return sortedCamps;
  }

  /** START REGION
   * Hacky way to implement string similarity search
   */

  // Sort by descding order (best match to worst)
  private sortMatches(matches: StringMatch[]): StringMatch[] {
    return matches.sort((a, b) => a.rating < b.rating ? 1 : -1);
  }

  private campToStringSearch(camp: Camp): string {
    return `${camp.id} ${camp.name}`;
    // return `${camp.id} ${camp.name} ${camp.description}`;
  }

  private stringSearchToCampId(s: string): string {
    return s.split(' ')[0];
  }
  // END REGION

}

export enum SourceEnum {
  HorseCamps,
  HorseTrails
}
