import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PhotoAdderComponent } from '../components-admin/photo-adder/photo-adder.component';
import { PhotoAdderModalComponent } from '../components-admin/photo-adder-modal/photo-adder-modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
      PhotoAdderComponent,
      PhotoAdderModalComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  entryComponents: [
      PhotoAdderComponent,
      PhotoAdderModalComponent,
  ],
  exports: [
      PhotoAdderComponent,
      PhotoAdderModalComponent,
  ]
})
export class PhotoAdderComponentsModule { }
