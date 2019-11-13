import { Component, OnInit, OnDestroy } from '@angular/core';
import { Filter } from 'src/models/filter';
import { FilterService } from 'src/app/services/filter.service';
import { PopoverController } from '@ionic/angular';
import { Camp } from 'src/models/camp';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
})
export class FilterModalComponent implements OnInit, OnDestroy {
  filter: Filter = {
    distance: null,
  };

  campFilter: Camp['attributes'] = {
    bigRigFriendly: true,
    facilityCleanliness: true,
    wifi: true,
    horseFacilities: true,
  };

  constructor(
    protected filterService: FilterService,
    protected popoverCtrl: PopoverController,
  ) { }

  ngOnInit() {}

  done() {
    if (!this.filter.distance) {
      this.filter.distance = Infinity;
    }

    this.filterService.setCampFilter(this.filter);
    this.popoverCtrl.dismiss();
  }

  ngOnDestroy(): void {
  }

}
