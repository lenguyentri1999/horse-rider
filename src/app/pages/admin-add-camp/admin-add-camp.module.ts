import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminAddCampPage } from './admin-add-camp.page';
import { ComponentsAdminModule } from 'src/app/components-admin/components-admin.module';

const routes: Routes = [
  {
    path: '',
    component: AdminAddCampPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsAdminModule,
  ],
  declarations: [AdminAddCampPage]
})
export class AdminAddCampPageModule {}
