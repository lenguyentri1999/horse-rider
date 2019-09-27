import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Camp } from 'src/models/camp';
import { Observable, combineLatest, zip } from 'rxjs';
import { Review } from 'src/models/review';
import { forkJoin } from 'rxjs';
import { map, tap, flatMap, switchMap, take } from 'rxjs/operators';
import { ReviewService } from './review.service';

@Injectable({
  providedIn: 'root'
})
export class CampService {

  constructor(
    protected db: DbService,
    protected reviewService: ReviewService,
  ) { }

  // Returns all camps
  public getAll(): Observable<Array<Camp>> {
    return this.db.getListSortedByFunction<Camp>(`camps`);
  }

  // Returns all reviews for 1 camp
  public getAllCampReviews(camp: Camp): Observable<Review[]> {

    try {
      const ids = this.getAllCampReviewIds(camp);
      const reviews = ids.pipe(
        flatMap(arr => {
          let observables: Observable<Review>[] = [];
          observables = arr.map(id => this.reviewService.getReviewById(id));

          return combineLatest(observables);
        })
      );

      return reviews;

    } catch (err) {
      throw new Error(err);
    }
  }

  private getAllCampReviewIds(camp: Camp): Observable<string[]> {
      const ids = this.db.getObjectValues<Map<string, boolean>>(`reviews-by-campID/${camp.id}`)
        .pipe(
          map(hashmap => {
            return Object.keys(hashmap);
          })
        );
      return ids;
  }

}
