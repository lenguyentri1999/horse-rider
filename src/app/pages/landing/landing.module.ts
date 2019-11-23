import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LandingPage } from './landing.page';
import { AutoCompleteModule } from 'ionic4-auto-complete';
import { ComponentsModule } from 'src/app/components/components.module';
import { ComponentsMapboxModule } from 'src/app/components-mapbox/components-mapbox.module';

const routes: Routes = [
  {
    path: '',
    component: LandingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AutoCompleteModule,
    ComponentsModule,
    ComponentsMapboxModule,
  ],
  declarations: [LandingPage]
})
export class LandingPageModule {}
