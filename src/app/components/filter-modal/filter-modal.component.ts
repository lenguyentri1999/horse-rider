import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonFilter } from 'src/models/filter';
import { FilterService } from 'src/app/services/filter.service';
import { PopoverController } from '@ionic/angular';
import { Camp } from 'src/models/camp';
import { SourceEnum } from 'src/app/services/camp.service';
import { CampSearchFormValues } from '../camp-search-form/camp-search-form.component';
import { TrailSearchFormValues } from '../trail-search-form/trail-search-form.component';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
})
export class FilterModalComponent implements OnInit, OnDestroy {
  filter: CommonFilter = {
    distance: null,
  };

  campFilter: Camp['attributes'] = {
    bigRigFriendly: true,
    petFriendly: true,
    wifi: true,
  };

  readonly currentSource: SourceEnum;
  readonly SourceEnum = SourceEnum;

  constructor(
    protected filterService: FilterService,
    protected popoverCtrl: PopoverController,
  ) {
    this.currentSource = this.filterService.currentSource;
  }

  ngOnInit() {
  }

  submitCampAttributesFilter(values: CampSearchFormValues) {
    this.filterService.setCampAttributesFilter(values);
    this.popoverCtrl.dismiss();
  }

  submitTrailAttributesFilter(values: TrailSearchFormValues) {
    this.filterService.setTrailAttributesFilter(values);
    this.popoverCtrl.dismiss();
  }

  // done() {
  //   if (!this.filter.distance) {
  //     this.filter.distance = Infinity;
  //   }

  //   this.filterService.setFilter(this.filter);
  //   this.popoverCtrl.dismiss();
  // }

  ngOnDestroy(): void {
  }

}
