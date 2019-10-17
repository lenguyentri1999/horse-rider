import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camp } from 'src/models/camp';
import { Review } from 'src/models/review';
import { ReviewService } from 'src/app/services/review.service';
import { CampService } from 'src/app/services/camp.service';
import { Observable, of } from 'rxjs';
import { NavParamsService } from 'src/app/services/nav-params.service';
import { map, flatMap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-camp-info',
  templateUrl: './camp-info.page.html',
  styleUrls: ['./camp-info.page.scss'],
})
export class CampInfoPage implements OnInit {
  camp$: Observable<Camp> = new Observable<Camp>();
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
      console.log(camp);
    });
    this.campReviews$ = this.camp$.pipe(
      switchMap(camp => {
        return this.reviewService.getByCampID(camp.id);
      }
      ));
    this.avgRating$ = this.camp$.pipe(
      switchMap(camp => this.campService.getAverageRating(camp.id))
    );
  }

  initQueryParams(): Observable<Camp> {
    return this.route.paramMap.pipe(
      switchMap(params => this.campService.getByID(params.get('id')))
    );
  }

  submitReview(review: Review) {
    this.reviewService.submitReview(review);
  }
}
