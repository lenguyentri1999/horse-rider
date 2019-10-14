import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MapboxglMapComponent } from './mapboxgl-map/mapboxgl-map.component';

@NgModule({
  declarations: [
      MapboxglMapComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
//   entryComponents: [
//   ],
  exports: [
    MapboxglMapComponent,
  ]
})
export class ComponentsMapboxModule { }
