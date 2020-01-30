import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Review } from 'src/models/reviews/review';
import { Observable, combineLatest, of } from 'rxjs';
import { IByCampID } from 'src/models/firebase/IByCampID';
import { IByUserID } from 'src/models/firebase/IByUserID';
import { IByID } from 'src/models/firebase/IByID';
import { map, flatMap } from 'rxjs/operators';
import { PhotoUrlWrapper } from 'src/models/photoModalOutput';
import { ReviewImgHandler } from 'src/models/reviews/reviewImgHandler';
import { CampService } from './camp.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService implements IByCampID<Review>, IByUserID<Review>, IByID<Review> {
  constructor(
    protected db: DbService,
    protected campService: CampService,
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
    return this.db.getObjectValues<Review>(`reviews/review-info/${id}`);
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
    review.submitReview(this.db);
  }

  submitReviewPhotos(review: Review, preUploadedImgs: PhotoUrlWrapper[]) {
    const reviewImgHandler = new ReviewImgHandler(review, preUploadedImgs);
    reviewImgHandler.uploadPhotos(this.db);
  }

  public getAverageRating(campID: string): Observable<number> {
    return this.getAllReviewRatings(campID)
      .pipe(
        map(ratings => {
          if (ratings.length === 0) {
            return 0;
          }

          let sum = 0;
          ratings.forEach(rating => sum += rating);
          return sum / ratings.length;
        })
      );
  }

  private getReviewRating(id: string): Observable<number> {
    return this.db.getObjectValues<number>(`reviews/review-info/${id}/rating`);
  }

  private getAllCampReviewIds(campID: string): Observable<string[]> {
    const ids = this.db.getObjectValues<Map<string, boolean>>(`reviews/review-by-campID/${campID}`)
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
