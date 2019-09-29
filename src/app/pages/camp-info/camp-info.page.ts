import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camp } from 'src/models/camp';
import { Review } from 'src/models/review';
import { ReviewService } from 'src/app/services/review.service';
import { CampService } from 'src/app/services/camp.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  ) { }

  ngOnInit() {
    this.camp$ = this.initQueryParams();
    this.camp$.subscribe(camp => {
      this.campReviews$ = this.reviewService.getByCampID(camp.id);
      this.avgRating$ = this.campService.getAverageRating(camp.id);
    });
  }

  initQueryParams(): Observable<Camp> {
    const camp$ = this.route.queryParams.pipe(
      map(_ => {
        const state = this.router.getCurrentNavigation().extras.state;

        if (state && state.camp) {
          return state.camp;
        } else {
          throw new Error('Must pass state with key camp to camp-info.ts');
        }
      })
    );
    return camp$;
  }

  submitReview(review: Review) {
    this.reviewService.submitReview(review);
  }
}
