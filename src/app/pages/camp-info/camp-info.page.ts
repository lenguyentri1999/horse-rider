import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camp } from 'src/models/camp';
import { Review } from 'src/models/review';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-camp-info',
  templateUrl: './camp-info.page.html',
  styleUrls: ['./camp-info.page.scss'],
})
export class CampInfoPage implements OnInit {
  camp: Camp;

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected reviewService: ReviewService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(_ => {
      const state = this.router.getCurrentNavigation().extras.state;

      if (state && state.camp) {
        this.camp = state.camp;

      } else {
        throw new Error('Must pass state with key camp to camp-info.ts');
      }
    });
  }

  submitReview(review: Review) {
    this.reviewService.submitReview(review);
  }
}
