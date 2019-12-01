import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { AddCampComponent } from './add-camp/add-camp.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddTrailComponent } from './add-trail/add-trail.component';
import { AutoCompleteModule } from 'ionic4-auto-complete';
import { AddEventComponent } from './add-event/add-event.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { PhotoAdderComponent } from './photo-adder/photo-adder.component';
import { PhotoAdderModalComponent } from './photo-adder-modal/photo-adder-modal.component';
import { AdminBlogComponent } from './admin-blog/admin-blog.component';
import { ComponentsModule } from '../components/components.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AddCampComponent,
    AddTrailComponent,
    AddEventComponent,
    AddBlogComponent,
    PhotoAdderComponent,
    PhotoAdderModalComponent,
    AdminBlogComponent,
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
  ],
  entryComponents: [
    AddCampComponent,
    AddTrailComponent,
    AddEventComponent,
    AddBlogComponent,
    PhotoAdderComponent,
    PhotoAdderModalComponent,
    AdminBlogComponent,
  ],
  exports: [
    AddCampComponent,
    AddTrailComponent,
    AddEventComponent,
    AddBlogComponent,
    PhotoAdderComponent,
    AdminBlogComponent,
  ]
})
export class ComponentsAdminModule { }

