import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TrailsPage } from './trails.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ComponentsMapboxModule } from 'src/app/components-mapbox/components-mapbox.module';
import { AutoCompleteModule } from 'ionic4-auto-complete';
import { NgxPaginationModule } from 'ngx-pagination';

const routes: Routes = [
  {
    path: '',
    component: TrailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    ComponentsMapboxModule,
    AutoCompleteModule,
    NgxPaginationModule
  ],
  declarations: [TrailsPage]
})
export class TrailsPageModule {}
