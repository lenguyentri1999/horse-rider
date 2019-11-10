import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { Camp } from 'src/models/camp';
import { Observable } from 'rxjs';
import { Review } from 'src/models/review';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-review-write-new-review',
  templateUrl: './review-write-new-review.component.html',
  styleUrls: ['./review-write-new-review.component.scss'],
})
export class ReviewWriteNewReviewComponent implements OnInit {
  camp$: Observable<Camp>;

  constructor(
    protected navParams: NavParams,
    protected reviewService: ReviewService,
    protected popoverCtrl: PopoverController
  ) { }

  ngOnInit(
  ) {
    this.camp$ = this.navParams.get('camp');
  }

  submitReview(review: Review) {
    this.reviewService.submitReview(review);
    this.popoverCtrl.dismiss();
  }

  exitPopover() {
    this.popoverCtrl.dismiss();
  }

  cancel() {
    this.popoverCtrl.dismiss();
  }

}
