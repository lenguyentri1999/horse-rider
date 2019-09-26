import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Review } from 'src/models/review';
import { Camp } from 'src/models/camp';
import { AuthService } from 'src/app/services/auth.service';
import { chain } from 'fp-ts/lib/Option';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  readyToEdit: Promise<boolean>;
  readyToView: Promise<boolean>;

  @Input() camp: Camp;
  @Input() isEditMode: boolean; // true when user is posting a review

  // Only when isEditMode is false
  @Input() review?: Review;

  // When editMode is false
  reviewToSubmit?: Review;
  @Output() submitReview = new EventEmitter<Review>();

  constructor(
    protected authService: AuthService
  ) {
  }

  ngOnInit() {

    if (this.isEditMode) {
      // User is creating new review
      this.reviewToSubmit = {
        rating: 5,
        description: '',
        campID: this.camp.id,
        userID: this.authService.getUserId()
      };

      this.readyToEdit = Promise.resolve(true);

    } else {
      console.log()
      //
    }
  }

  onRateChange(rating: number) {
    this.reviewToSubmit.rating = rating;
  }

  // Send review to output
  onSubmit() {
    this.submitReview.emit(this.reviewToSubmit);
  }

}
