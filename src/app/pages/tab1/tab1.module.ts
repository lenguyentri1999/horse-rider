import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ComponentsModule } from '../../components/components.module';
import { AutoCompleteModule } from 'ionic4-auto-complete';
import { ComponentsMapboxModule } from 'src/app/components-mapbox/components-mapbox.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }]),
    ComponentsModule,
    ComponentsMapboxModule,
    AutoCompleteModule,
    NgxPaginationModule
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
