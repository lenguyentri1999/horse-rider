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

@NgModule({
  declarations: [
    AddCampComponent,
    AddTrailComponent,
    AddEventComponent,
    AddBlogComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    AutoCompleteModule,
  ],
  entryComponents: [
    AddCampComponent,
    AddTrailComponent,
    AddEventComponent,
    AddBlogComponent,
  ],
  exports: [
    AddCampComponent,
    AddTrailComponent,
    AddEventComponent,
    AddBlogComponent,
  ]
})
export class ComponentsAdminModule { }

