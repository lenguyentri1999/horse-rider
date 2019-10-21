import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Review } from 'src/models/review';
import { Camp } from 'src/models/camp';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, Subject } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { LoginPage } from 'src/app/pages/login/login.page';
import { tap } from 'rxjs/operators';

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

  // When editMode is false
  reviewToSubmit?: Review;
  @Output() submitReview = new EventEmitter<Review>();

  constructor(
    protected authService: AuthService,
    protected modalController: ModalController,
  ) {
  }

  ngOnInit() {
    if (!this.isEditMode) {
      this.readyToView = Promise.resolve(true);
    } else {
      this.onChanges.pipe(
        tap(changes => {
          if (changes && changes.camp) {
            this.isAuth = this.authService.isAuthorized();

            if (this.isEditMode) {
              // User is creating new review
              this.reviewToSubmit = {
                rating: 5,
                description: '',
                campID: changes.camp.currentValue.id,
                userID: this.authService.getUserId(),
                dateTime: new Date()
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

  // Send review to output
  onSubmit() {
    this.submitReview.emit(this.reviewToSubmit);
  }

}
