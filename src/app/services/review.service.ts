import { Injectable } from '@angular/core';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(
    db: DbService
  ) { }
}
