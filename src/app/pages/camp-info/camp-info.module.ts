import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CampInfoPage } from './camp-info.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { IonicRatingModule } from 'ionic-rating';
import { ComponentsMapboxModule } from 'src/app/components-mapbox/components-mapbox.module';

const routes: Routes = [
  {
    path: '',
    component: CampInfoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    IonicRatingModule,
    ComponentsMapboxModule,
  ],
  declarations: [
    CampInfoPage,
    // StarRating
  ],
  exports: [
    // StarRating,
  ]
})
export class CampInfoPageModule {}
