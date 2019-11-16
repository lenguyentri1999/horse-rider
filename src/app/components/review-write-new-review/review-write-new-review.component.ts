import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { Camp } from 'src/models/camp';
import { Observable } from 'rxjs';
import { Review } from 'src/models/review';
import { ReviewService } from 'src/app/services/review.service';
import { map, switchMap } from 'rxjs/operators';
import { CampService } from 'src/app/services/camp.service';
import { CampReview } from 'src/models/campReview';

@Component({
  selector: 'app-review-write-new-review',
  templateUrl: './review-write-new-review.component.html',
  styleUrls: ['./review-write-new-review.component.scss'],
})
export class ReviewWriteNewReviewComponent implements OnInit {
  camp$: Observable<Camp>;
  isTrail: Observable<boolean>;

  constructor(
    protected reviewService: ReviewService,
    protected campService: CampService,
    protected navParams: NavParams,
    protected popoverCtrl: PopoverController,
  ) {

    this.camp$ = this.navParams.get('camp');
    this.isTrail = this.camp$.pipe(
      switchMap(camp => this.campService.isTrail(camp))
    );
  }

  ngOnInit(
  ) {
  }

  submitReview(review: Review) {
    this.reviewService.submitReview(review);
    this.popoverCtrl.dismiss();
  }

  submitCampReview(campReview: CampReview) {
    this.reviewService.submitCampReview(campReview);
  }

  exitPopover() {
    this.popoverCtrl.dismiss();
  }

  cancel() {
    this.popoverCtrl.dismiss();
  }

}
