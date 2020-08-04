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
import { BlogPostComponent } from './blog-post/blog-post.component';
import { PhotoAdderComponentsModule } from '../components-modules/photo-adder.module';

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
    BlogPostComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    IonicRatingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    PhotoAdderComponentsModule,
    // ComponentsAdminModule,
  ],
  entryComponents: [
    FilterModalComponent,
    SortPopoverComponent,
    PwaNavFooterComponent,
    ReviewWriteNewReviewComponent,
    TrailSearchFormComponent,
    CampSearchFormComponent,
    RequestNewCampComponent,
    BlogPostComponent,
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
    BlogPostComponent,
  ]
})
export class ComponentsModule { }
