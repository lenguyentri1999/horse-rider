import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampCardComponent } from './camp-card/camp-card.component';
import { IonicModule } from '@ionic/angular';
import { ReviewComponent } from './review/review.component';
import { IonicRatingModule } from 'ionic-rating';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PwaNavBarComponent } from './pwa-nav-bar/pwa-nav-bar.component';
import { RouterModule } from '@angular/router';
import { FilterModalComponent } from './filter-modal/filter-modal.component';
import { SortPopoverComponent } from './sort-popover/sort-popover.component';
import { PwaNavFooterComponent } from './pwa-nav-footer/pwa-nav-footer.component';
import { ReviewWriteNewReviewComponent } from './review-write-new-review/review-write-new-review.component';

@NgModule({
  declarations: [
    CampCardComponent,
    ReviewComponent,
    ReviewWriteNewReviewComponent,
    PwaNavBarComponent,
    FilterModalComponent,
    SortPopoverComponent,
    PwaNavFooterComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    IonicRatingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  entryComponents: [
    FilterModalComponent,
    SortPopoverComponent,
    PwaNavFooterComponent,
    ReviewWriteNewReviewComponent
  ],
  exports: [
    CampCardComponent,
    ReviewComponent,
    PwaNavBarComponent,
    FilterModalComponent,
    SortPopoverComponent,
    PwaNavFooterComponent,
    ReviewWriteNewReviewComponent,
  ]
})
export class ComponentsModule { }
