import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampCardComponent } from './camp-card/camp-card.component';
import { IonicModule } from '@ionic/angular';
import { ReviewComponent } from './review/review.component';
import { IonicRatingModule } from 'ionic-rating';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CampCardComponent,
    ReviewComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    IonicRatingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    CampCardComponent,
    ReviewComponent,
  ]
})
export class ComponentsModule { }
