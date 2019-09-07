import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Review } from 'src/models/review';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  // True when user can edit review, False to display one from other users
  @Input() isEditMode: boolean;

  // When isEditMode = false
  @Input() review?: Review; // Review only populated if isEditMode is on

  // When isEditMode = true
  @Output() submitReview = new EventEmitter<Review>();
  reviewToSubmit: Review;

  constructor() { }

  ngOnInit() {
    if (this.isEditMode) {
      // User is creating new review
      this.reviewToSubmit = {
        rating: 5,
        description: '',
      };


    } else {
      //
    }
  }

  onRateChange(rating: number) {
    this.reviewToSubmit.rating = rating;
  }

  onSubmit() {
    this.submitReview.emit(this.reviewToSubmit);
  }

}
