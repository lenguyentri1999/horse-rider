import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Camp } from 'src/models/camp';
import { Observable, combineLatest, zip } from 'rxjs';
import { Review } from 'src/models/review';
import { forkJoin } from 'rxjs';
import { map, tap, flatMap, switchMap, take } from 'rxjs/operators';
import { ReviewService } from './review.service';
import { IGetAll } from 'src/models/firebase/IGetAll';

@Injectable({
  providedIn: 'root'
})
export class CampService implements IGetAll<Camp> {

  constructor(
    protected db: DbService,
    protected reviewService: ReviewService,
  ) { }

  // Returns all camps
  public getAll(): Observable<Camp[]> {
    return this.db.getListSortedByFunction<Camp>(`camps`);
  }

  public getAverageRating(campID: string): Observable<number> {
    return this.reviewService.getAllReviewRatings(campID)
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
}
