import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Review } from 'src/models/review';
import { Camp } from 'src/models/camp';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, Subject } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { tap, first } from 'rxjs/operators';
import { UserData } from 'src/models/userData';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { CampReview } from 'src/models/campReview';
import { CampService } from 'src/app/services/camp.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit, OnChanges {

  readyToEdit: Promise<boolean>;
  readyToView: Promise<boolean>;
  isAuth: Observable<boolean>;

  onChanges = new Subject<SimpleChanges>();

  @Input() camp: Camp;
  @Input() isEditMode: boolean; // true when user is posting a review

  // Only when isEditMode is false
  @Input() review?: Review;
  userData$: Observable<UserData>;

  // When editMode is false
  reviewToSubmit?: Review;
  campReviewToSubmit?: CampReview;
  CampReviewAttributes = CampReviewAttributes;

  isTrail$: Observable<boolean>;
  isTrail: boolean;
  @Output() submitReview = new EventEmitter<Review>();
  @Output() submitCampReview = new EventEmitter<CampReview>();
  @Output() exitEventEmitter = new EventEmitter<void>();

  constructor(
    protected authService: AuthService,
    protected userProfileService: UserProfileService,
    protected campService: CampService,
    protected modalController: ModalController,
  ) {
  }

  ngOnInit() {
    if (!this.isEditMode) {
      this.readyToView = Promise.resolve(true);
      this.userData$ = this.userProfileService.getUserProfile(this.review.userID);
    } else {
      this.onChanges.pipe(
        tap(changes => {
          if (changes && changes.camp) {
            this.isAuth = this.authService.isAuthorized();
            this.isTrail$ = this.campService.isTrail(changes.camp.currentValue);
            this.isTrail$.subscribe(val => {
              this.isTrail = val;
            });

            if (this.isEditMode) {
              // User is creating new review
              this.reviewToSubmit = {
                rating: 5,
                description: '',
                campID: changes.camp.currentValue.id,
                userID: this.authService.getUserId(),
                dateTime: new Date()
              };

              this.campReviewToSubmit = {
                campID: changes.camp.currentValue.id,
                userID: this.authService.getUserId(),
                dateTime: new Date(),
                facilityCleanliness: 5,
                horseFacilities: 5,
                bigRigFriendly: 5,
                petFriendly: 5,
                wifi: 5
              };

              this.readyToEdit = Promise.resolve(true);
            }
          }
        })
      ).subscribe();
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.onChanges.next(changes);
  }

  onRateChange(rating: number) {
    this.reviewToSubmit.rating = rating;
  }

  onCampAttributeRateChange(rating: number, attr: CampReviewAttributes) {
    this.campReviewToSubmit[attr] = rating;
  }

  onFacilityCleanlinessRateChange(rating: number) {
    this.campReviewToSubmit.facilityCleanliness = rating;
  }

  onHorseFacilitiesRateChange(rating: number) {
    this.campReviewToSubmit.horseFacilities = rating;
  }

  // Send review to output
  onSubmit() {
    if (!this.isTrail) {
      this.submitCampReview.emit(this.campReviewToSubmit);
    }
    this.submitReview.emit(this.reviewToSubmit);
  }

  onLoginButtonClick() {
    this.exitEventEmitter.emit();
  }

}

enum CampReviewAttributes {
  bigRigFriendly = 'bigRigFriendly',
  petFriendly = 'petFriendly',
  facilityCleanliness = 'facilityCleanliness',
  horseFacilities = 'horseFacilities',
  wifi = 'wifi',
}
