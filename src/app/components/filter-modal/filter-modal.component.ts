import { Component, OnInit, OnDestroy } from '@angular/core';
import { Filter } from 'src/models/filter';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
})
export class FilterModalComponent implements OnInit, OnDestroy {
  filter: Filter = {
    distance: 50
  };

  constructor(
    protected filterService: FilterService
  ) { }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.filterService.setCampFilter(this.filter);
  }

}
