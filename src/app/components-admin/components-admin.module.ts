import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { AddCampComponent } from './add-camp/add-camp.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddTrailComponent } from './add-trail/add-trail.component';
import { AutoCompleteModule } from 'ionic4-auto-complete';
import { AddEventComponent } from './add-event/add-event.component';

@NgModule({
  declarations: [
      AddCampComponent,
      AddTrailComponent,
      AddEventComponent,
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
  ],
  exports: [
      AddCampComponent,
      AddTrailComponent,
      AddEventComponent,
  ]
})
export class ComponentsAdminModule { }

