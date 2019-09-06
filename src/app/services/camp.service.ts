import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Camp } from 'src/models/camp';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampService {

  constructor(
    protected db: DbService
  ) { }

  public getAll(): Observable<Array<Camp>> {
    return this.db.getListSortedByFunction<Camp>(`camps`);
  }
}
