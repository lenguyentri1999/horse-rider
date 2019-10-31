import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { AddCampComponent } from './add-camp/add-camp.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddTrailComponent } from './add-trail/add-trail.component';
import { AutoCompleteModule } from 'ionic4-auto-complete';

@NgModule({
  declarations: [
      AddCampComponent,
      AddTrailComponent,
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
  ],
  exports: [
      AddCampComponent,
      AddTrailComponent,
  ]
})
export class ComponentsAdminModule { }

