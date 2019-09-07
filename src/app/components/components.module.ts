import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampCardComponent } from './camp-card/camp-card.component';
import { IonicModule } from '@ionic/angular';
import { ReviewComponent } from './review/review.component';

@NgModule({
  declarations: [
    CampCardComponent,
    ReviewComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    CampCardComponent,
    ReviewComponent,
  ]
})
export class ComponentsModule { }
