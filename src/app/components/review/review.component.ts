import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Review } from 'src/models/review';
import { Camp } from 'src/models/camp';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { LoginPage } from 'src/app/pages/login/login.page';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  readyToEdit: Promise<boolean>;
  readyToView: Promise<boolean>;
  isAuth: Observable<boolean>;

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
    this.isAuth = this.authService.isAuthorized();

    if (this.isEditMode) {
      // User is creating new review
      this.reviewToSubmit = new Review(5, '', this.camp.id, this.authService.getUserId(), new Date());
      this.readyToEdit = Promise.resolve(true);

    } else {
      this.readyToView = Promise.resolve(true);
    }
  }

  onRateChange(rating: number) {
    this.reviewToSubmit.rating = rating;
  }

  // Send review to output
  onSubmit() {
    this.submitReview.emit(this.reviewToSubmit);
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: LoginPage,
    });
    modal.present();
  }

}
