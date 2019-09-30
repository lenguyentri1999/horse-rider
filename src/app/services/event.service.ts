import { Injectable } from '@angular/core';
import { IByID } from 'src/models/firebase/IByID';
import { RideEvent } from 'src/models/event';
import { IByCampID } from 'src/models/firebase/IByCampID';
import { IByUserID } from 'src/models/firebase/IByUserID';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService implements IByID<RideEvent>, IByCampID<RideEvent>, IByUserID<RideEvent> {
  constructor() { }

  getByID(id: string): Observable<RideEvent> {
    throw new Error('Method not implemented.');
  }
  getByCampID(campID: string): Observable<RideEvent[]> {
    throw new Error('Method not implemented.');
  }
  getByUserID(userID: string): Observable<RideEvent[]> {
    throw new Error('Method not implemented.');
  }

}
