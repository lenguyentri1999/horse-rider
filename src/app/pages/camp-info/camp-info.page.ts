import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camp } from 'src/models/camp';
import { Review, ReviewAttrs } from 'src/models/reviews/review';
import { ReviewService } from 'src/app/services/review.service';
import { CampService } from 'src/app/services/camp.service';
import { Observable, of, combineLatest, forkJoin } from 'rxjs';
import { NavParamsService } from 'src/app/services/nav-params.service';
import { map, flatMap, switchMap, first, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { AddCampComponent } from 'src/app/components-admin/add-camp/add-camp.component';
import { ReviewComponent } from 'src/app/components/review/review.component';
import { ReviewWriteNewReviewComponent } from 'src/app/components/review-write-new-review/review-write-new-review.component';
import { TrailReviewAttributes } from 'src/models/reviews/trailReview';
import { CampReviewAttributes } from 'src/models/reviews/campReview';
import { ReviewAvgHandler } from 'src/models/reviews/reviewAvgHandler';

@Component({
  selector: 'app-camp-info',
  templateUrl: './camp-info.page.html',
  styleUrls: ['./camp-info.page.scss'],
})
export class CampInfoPage implements OnInit {
  pReview: number = 1;
  pReviewPhoto: number = 1;
  isViewing = true;
  isAdmin: Observable<boolean>;

  TrailReviewAttributes = TrailReviewAttributes;
  CampReviewAttributes = CampReviewAttributes;

  camp$: Observable<Camp>;
  isTrail$: Observable<boolean>;
  avgRating$: Observable<number>;
  campReviews$: Observable<Review[]>;
  campReviewPhotos$: Observable<any>;
  campAvgRatingHandler: ReviewAvgHandler;

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected modalCtrl: ModalController,
    protected popoverCtrl: PopoverController,
    protected reviewService: ReviewService,
    protected campService: CampService,
    protected navParamService: NavParamsService,
    protected authService: AuthService
  ) { }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.camp$ = this.initQueryParams();
    this.isTrail$ = this.camp$.pipe(
      switchMap(camp => this.campService.isTrail(camp))
    );

    this.campReviews$ = this.camp$.pipe(
      switchMap(camp => {
        return this.reviewService.getByCampID(camp.id);
      }
      ));
    this.avgRating$ = this.camp$.pipe(
      switchMap(camp => this.reviewService.getAverageRating(camp.id, ReviewAttrs.rating))
    );

    this.campReviewPhotos$ = this.camp$.pipe(
      switchMap(camp => {
        return this.reviewService.getAllReviewPhotos(camp.id);
      }),
      tap(val => console.log(val))
    );

    const campId$ = this.camp$.pipe(
      map(camp => camp.id)
    );
    this.isTrail$.pipe(
      tap(isTrail => {
        if (isTrail) {
          this.campAvgRatingHandler = ReviewAvgHandler.GetTrailAverages(campId$, this.campReviews$, this.reviewService);
        } else {
          this.campAvgRatingHandler = ReviewAvgHandler.GetCampAverages(campId$, this.campReviews$, this.reviewService);
        }
      })
    ).subscribe();
  }

  initQueryParams(): Observable<Camp> {
    return this.route.paramMap.pipe(
      switchMap(params => this.campService.getByID(params.get('id')))
    );
  }

  async onWriteReviewButtonClick() {
    const modal = await this.modalCtrl.create({
      component: ReviewWriteNewReviewComponent,
      componentProps: {
        camp: this.camp$
      }
    });
    modal.present();
  }

  // ADMIN SECTION
  async onAdminEditButtonClick() {
    this.camp$.pipe(
      first()
    ).
      subscribe(async (camp: Camp) => {
        const modal = await this.modalCtrl.create({
          component: AddCampComponent,
          componentProps: {
            camp
          }
        });
        modal.present();
      });
  }

  onPageChange(page: number) {
    this.pReview = page;
  }
  onReviewPhotoPageChange(pagePhoto: number) {
    this.pReviewPhoto = pagePhoto;
  }
}
