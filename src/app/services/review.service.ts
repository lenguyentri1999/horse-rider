import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Review, ReviewAttrs } from 'src/models/reviews/review';
import { Observable, combineLatest, of } from 'rxjs';
import { IByCampID } from 'src/models/firebase/IByCampID';
import { IByUserID } from 'src/models/firebase/IByUserID';
import { IByID } from 'src/models/firebase/IByID';
import { map, flatMap } from 'rxjs/operators';
import { PhotoUrlWrapper } from 'src/models/photoModalOutput';
import { ReviewImgHandler } from 'src/models/reviews/reviewImgHandler';
import { CampService } from './camp.service';
import { TrailReviewAttributes } from 'src/models/reviews/trailReview';
import { CampReviewAttributes } from 'src/models/reviews/campReview';

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

  public getAllReviewPhotos(campID: string): Observable<string[]> {
    try {
      const ids = this.getAllCampReviewIds(campID);
      const photos = ids.pipe(
        flatMap(arr => {
          if (arr.length === 0) {
            return of([]);
          }

          let observables: Observable<string[]>[] = [];
          observables = arr.map(id => this.getReviewPhotos(id));

          return combineLatest(observables);
        }),
        map(arr => this.flatten<string>(arr))
      );

      return photos;

    } catch (err) {
      throw new Error(err);
    }

  }

  // Source: https://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays/39000004#39000004
  // Returns a flattenned array
  private flatten<T>(arr: T[], result = []): T[] {
    for (let i = 0, length = arr.length; i < length; i++) {
      const value = arr[i];
      if (Array.isArray(value)) {
        this.flatten(value, result);
      } else {
        result.push(value);
      }
    }
    return result;
  };

  public submitReview(review: Review) {
    review.submitReview(this.db);
  }

  public submitReviewPhotos(review: Review, preUploadedImgs: PhotoUrlWrapper[]) {
    const reviewImgHandler = new ReviewImgHandler(review, preUploadedImgs);
    reviewImgHandler.uploadPhotos(this.db);
  }

  // Get the average rating based on all the ratings for the camp
  public getAverageRating(campID: string, attr: ReviewAttrs | TrailReviewAttributes | CampReviewAttributes): Observable<number> {
    return this.getAllReviewRatings(campID, attr)
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

  // Get all the ratings for a specific camp
  public getAllReviewRatings(campID: string, attr: ReviewAttrs | CampReviewAttributes | TrailReviewAttributes): Observable<number[]> {
    try {
      const ids = this.getAllCampReviewIds(campID);
      const ratings = ids.pipe(
        flatMap(arr => {
          if (arr.length === 0) {
            return of([]);
          }

          let observables: Observable<number>[] = [];
          observables = arr.map(id => this.getReviewInfo(id, attr));

          return combineLatest(observables);
        })
      );

      return ratings;

    } catch (err) {
      throw new Error(err);
    }
  }

  // Get specific information about a rating
  private getReviewInfo(id: string, attr: ReviewAttrs | CampReviewAttributes | TrailReviewAttributes): Observable<number> {
    return this.db.getObjectValues<number>(`reviews/review-info/${id}/${attr}`);
  }


  private getReviewPhotos(id: string): Observable<string[]> {
    return this.db.getObjectValues<string[]>(`reviews/review-imgs/${id}`);
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
