import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampCardComponent } from './camp-card/camp-card.component';
import { IonicModule } from '@ionic/angular';
import { ReviewComponent } from './review/review.component';
import { IonicRatingModule } from 'ionic-rating';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PwaNavBarComponent } from './pwa-nav-bar/pwa-nav-bar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CampCardComponent,
    ReviewComponent,
    PwaNavBarComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    IonicRatingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  exports: [
    CampCardComponent,
    ReviewComponent,
    PwaNavBarComponent,
  ]
})
export class ComponentsModule { }
