import { Injectable } from '@angular/core';
import { IByID } from 'src/models/firebase/IByID';
import { IByCampID } from 'src/models/firebase/IByCampID';
import { IByUserID } from 'src/models/firebase/IByUserID';
import { Observable, from, of } from 'rxjs';
import { IAddNew } from 'src/models/firebase/IAddNew';
import { AbstractEvent } from 'src/models/event/event';
import { DbService } from './db.service';
import { catchError, flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService implements IAddNew<AbstractEvent>, IByID<AbstractEvent>, IByCampID<AbstractEvent>, IByUserID<AbstractEvent> {
  constructor(
    protected dbService: DbService
  ) { }

  tryAddNew(obj: AbstractEvent): Observable<boolean> {
    return from(this.dbService.setObjectAtPath(`events/${obj.id}`, obj)).pipe(
      catchError(_ => of(false)),
      flatMap(_ => of(true))
    );
  }

  getByID(id: string): Observable<AbstractEvent> {
    throw new Error('Method not implemented.');
  }
  getByCampID(campID: string): Observable<AbstractEvent[]> {
    throw new Error('Method not implemented.');
  }
  getByUserID(userID: string): Observable<AbstractEvent[]> {
    throw new Error('Method not implemented.');
  }

}
