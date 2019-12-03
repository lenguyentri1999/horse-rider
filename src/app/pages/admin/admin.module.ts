import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminPage } from './admin.page';
import { ComponentsAdminModule } from 'src/app/components-admin/components-admin.module';
import { AddCampComponent } from 'src/app/components-admin/add-camp/add-camp.component';
import { AdminBlogComponent } from 'src/app/components-admin/admin-blog/admin-blog.component';
import { AddBlogComponent } from 'src/app/components-admin/add-blog/add-blog.component';
import { AdminCampsComponent } from 'src/app/components-admin/admin-camps/admin-camps.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPage,
    children: [
      {
        path: 'add/:type',
        component: AddCampComponent,
      },
      {
        path: 'places/:source',
        component: AdminCampsComponent,
      },
      {
        path: 'blog',
        component: AdminBlogComponent,
      },
      {
        path: 'blog-add',
        component: AddBlogComponent,
      }
    ]
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
  declarations: [AdminPage]
})
export class AdminPageModule {}
