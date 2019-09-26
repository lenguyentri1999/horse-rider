import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Review } from 'src/models/review';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(
    protected db: DbService
  ) { }

  submitReview(review: Review) {
    const writes: Map<string, object> = new Map<string, object>();
    const id = this.db.uuidv4();

    const ref = `reviews/${id}`;
    const refByUid = `reviews-by-uid/${review.userID}`;
    const refByCampID = `reviews-by-campID/${review.campID}`;

    writes[ref] = review;
    writes[refByUid] = id;
    writes[refByCampID] = id;

    this.db.batchWrite(writes);
  }
}
