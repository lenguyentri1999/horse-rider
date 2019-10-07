import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camp } from 'src/models/camp';
import { Review } from 'src/models/review';
import { ReviewService } from 'src/app/services/review.service';
import { CampService } from 'src/app/services/camp.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { NavParamsService } from 'src/app/services/nav-params.service';

@Component({
  selector: 'app-camp-info',
  templateUrl: './camp-info.page.html',
  styleUrls: ['./camp-info.page.scss'],
})
export class CampInfoPage implements OnInit {
  camp$: Observable<Camp>;
  avgRating$: Observable<number>;
  campReviews$: Observable<Review[]>;

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected reviewService: ReviewService,
    protected campService: CampService,
    protected navParamService: NavParamsService,
  ) { }

  ngOnInit() {
    this.camp$ = this.initQueryParams();
    this.camp$.subscribe(camp => {
      this.campReviews$ = this.reviewService.getByCampID(camp.id);
      this.avgRating$ = this.campService.getAverageRating(camp.id);
    });
  }

  initQueryParams(): Observable<Camp> {
    return of(this.navParamService.getParam(CampInfoPage));
  }

  submitReview(review: Review) {
    this.reviewService.submitReview(review);
  }
}
