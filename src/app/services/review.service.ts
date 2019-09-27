import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Review } from 'src/models/review';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(
    protected db: DbService
  ) { }

  getReviewById(id: string): Observable<Review> {
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
}
