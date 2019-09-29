import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Review } from 'src/models/review';
import { Observable, combineLatest } from 'rxjs';
import { IByCampID } from 'src/models/firebase/IByCampID';
import { IByUserID } from 'src/models/firebase/IByUserID';
import { IByID } from 'src/models/firebase/IByID';
import { map, flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReviewService implements IByCampID<Review>, IByUserID<Review>, IByID<Review> {
  constructor(
    protected db: DbService
  ) { }

  getByCampID(campID: string): Observable<Review[]> {
    try {
      const ids = this.getAllCampReviewIds(campID);
      const reviews = ids.pipe(
        flatMap(arr => {
          let observables: Observable<Review>[] = [];
          observables = arr.map(id => this.getByID(id));

          return combineLatest(observables);
        })
      );

      return reviews;

    } catch (err) {
      throw new Error(err);
    }
  }
  getByUserID(userID: string): Observable<Review[]> {
    throw new Error('Method not implemented.');
  }

  getByID(id: string): Observable<Review> {
    return this.db.getObjectValues<Review>(`reviews/${id}`);
  }

  submitReview(review: Review) {
    const writes: Map<string, object> = new Map<string, object>();
    const id = this.db.uuidv4();

    const ref = `reviews/${id}`;
    const refByUid = `reviews-by-uid/${review.userID}/${id}`;
    const refByCampID = `reviews-by-campID/${review.campID}/${id}`;

    writes[ref] = review;
    writes[refByUid] = true;
    writes[refByCampID] = true;

    this.db.batchWrite(writes);
  }

  private getAllCampReviewIds(campID: string): Observable<string[]> {
    const ids = this.db.getObjectValues<Map<string, boolean>>(`reviews-by-campID/${campID}`)
      .pipe(
        map(hashmap => {
          if (!(hashmap)) {
            return [];
          }
          return Object.keys(hashmap);
        })
      );
    return ids;
  }

}
