import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AddCampComponent } from './add-camp/add-camp.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddTrailComponent } from './add-trail/add-trail.component';
import { AutoCompleteModule } from 'ionic4-auto-complete';
import { AddEventComponent } from './add-event/add-event.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { AdminBlogComponent } from './admin-blog/admin-blog.component';
import { ComponentsModule } from '../components/components.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminCampsComponent } from './admin-camps/admin-camps.component';
import { PhotoAdderComponentsModule } from '../components-modules/photo-adder.module';

@NgModule({
  declarations: [
    AddCampComponent,
    AddTrailComponent,
    AddEventComponent,
    AddBlogComponent,
    AdminBlogComponent,
    AdminCampsComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    AutoCompleteModule,
    ComponentsModule,
    NgxPaginationModule,
    CKEditorModule,
    PhotoAdderComponentsModule,
  ],
  entryComponents: [
    AddCampComponent,
    AddTrailComponent,
    AddEventComponent,
    AddBlogComponent,
    AdminBlogComponent,
    AdminCampsComponent,
  ],
  exports: [
    AddCampComponent,
    AddTrailComponent,
    AddEventComponent,
    AddBlogComponent,
    AdminBlogComponent,
    AdminCampsComponent,
  ]
})
export class ComponentsAdminModule { }

