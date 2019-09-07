import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampCardComponent } from './camp-card/camp-card.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    CampCardComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    CampCardComponent
  ]
})
export class ComponentsModule { }
