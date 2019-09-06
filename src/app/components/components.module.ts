import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampCardComponent } from './camp-card/camp-card.component';



@NgModule({
  declarations: [
    CampCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CampCardComponent
  ]
})
export class ComponentsModule { }
