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
import { TrailSearchFormComponent } from './trail-search-form/trail-search-form.component';
import { CampSearchFormComponent } from './camp-search-form/camp-search-form.component';
import { RequestNewCampComponent } from './request-new-camp/request-new-camp.component';

@NgModule({
  declarations: [
    CampCardComponent,
    ReviewComponent,
    ReviewWriteNewReviewComponent,
    PwaNavBarComponent,
    FilterModalComponent,
    SortPopoverComponent,
    PwaNavFooterComponent,
    TrailSearchFormComponent,
    CampSearchFormComponent,
    RequestNewCampComponent,
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
    ReviewWriteNewReviewComponent,
    TrailSearchFormComponent,
    CampSearchFormComponent,
    RequestNewCampComponent,
  ],
  exports: [
    CampCardComponent,
    ReviewComponent,
    PwaNavBarComponent,
    FilterModalComponent,
    SortPopoverComponent,
    PwaNavFooterComponent,
    ReviewWriteNewReviewComponent,
    TrailSearchFormComponent,
    CampSearchFormComponent,
    RequestNewCampComponent,
  ]
})
export class ComponentsModule { }
