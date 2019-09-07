import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Review } from 'src/models/review';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  @Input() isEditMode: boolean;
  // When isEditMode = false
  @Input() review?: Review; // Review only populated if isEditMode is on

  // When isEditMode = true
  @Output() submitReview = new EventEmitter<Review>();
  myForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.myForm = new FormGroup({
      description: new FormControl(),
      rating: new FormControl()
    });
  }

}
