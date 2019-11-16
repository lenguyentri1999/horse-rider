import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Review } from 'src/models/review';
import { Observable, combineLatest, of } from 'rxjs';
import { IByCampID } from 'src/models/firebase/IByCampID';
import { IByUserID } from 'src/models/firebase/IByUserID';
import { IByID } from 'src/models/firebase/IByID';
import { map, flatMap } from 'rxjs/operators';
import { CampReview } from 'src/models/campReview';

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

  getAllReviewRatings(campID: string): Observable<number[]> {
    try {
      const ids = this.getAllCampReviewIds(campID);
      const ratings = ids.pipe(
        flatMap(arr => {
          if (arr.length === 0) {
            return of([]);
          }

          let observables: Observable<number>[] = [];
          observables = arr.map(id => this.getReviewRating(id));

          return combineLatest(observables);
        })
      );

      return ratings;

    } catch (err) {
      throw new Error(err);
    }
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

  submitCampReview(campReview: CampReview) {
    const writes: Map<string, object> = new Map<string, object>();
    const id = this.db.uuidv4();

    const ref = `campReviews/${id}`;
    const refByUid = `camp-reviews-by-uid/${campReview.userID}/${id}`;
    const refByCampId = `camp-reviews-by-campID/${campReview.campID}/${id}`;

    writes[ref] = campReview;
    writes[refByUid] = true;
    writes[refByCampId] = true;

    this.db.batchWrite(writes);
  }

  private getReviewRating(id: string): Observable<number> {
    return this.db.getObjectValues<number>(`reviews/${id}/rating`);
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
