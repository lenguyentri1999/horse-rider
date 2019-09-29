import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camp } from 'src/models/camp';
import { Review } from 'src/models/review';
import { ReviewService } from 'src/app/services/review.service';
import { CampService } from 'src/app/services/camp.service';

@Component({
  selector: 'app-camp-info',
  templateUrl: './camp-info.page.html',
  styleUrls: ['./camp-info.page.scss'],
})
export class CampInfoPage implements OnInit {
  camp: Camp;
  campReviews: Review[];

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected reviewService: ReviewService,
    protected campService: CampService,
  ) { }

  ngOnInit() {
    this.initQueryParams();
  }

  initQueryParams() {
    this.route.queryParams.subscribe(_ => {
      const state = this.router.getCurrentNavigation().extras.state;

      if (state && state.camp) {

        this.initCamp(state.camp);

      } else {
        throw new Error('Must pass state with key camp to camp-info.ts');
      }
    });
  }

  initCamp(camp: Camp) {
        this.camp = camp;
        this.reviewService.getByCampID(this.camp.id).subscribe(arr => {
          this.campReviews = arr;
        });
  }

  submitReview(review: Review) {
    this.reviewService.submitReview(review);
  }
}
