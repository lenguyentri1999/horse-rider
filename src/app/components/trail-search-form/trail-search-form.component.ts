import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-trail-search-form',
  templateUrl: './trail-search-form.component.html',
  styleUrls: ['./trail-search-form.component.scss'],
})

export class TrailSearchFormComponent implements OnInit {
  @Input() nameElementHidden: boolean;
  myForm: FormGroup;
  defaultDifficulty = '';
  defaultBridges = '';
  defaultWaterCrossings = '';
  defaultParking = '';
  defaultFooting = '';

  @Output() submitForm = new EventEmitter<TrailSearchFormValues>();

  constructor(
    protected fb: FormBuilder,
    protected filterService: FilterService,
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: [''],
      difficulty: [this.defaultDifficulty],
      waterCrossings: [this.defaultWaterCrossings],
      bridges: [this.defaultBridges],
      parking: [this.defaultParking],
      footing: [this.defaultFooting]
    });

    this.filterService.getTrailAttributesFilter().subscribe(filter => {
      if (filter) {
        this.myForm = this.fb.group({
          name: [filter.name],
          difficulty: [filter.difficulty],
          waterCrossings: [filter.waterCrossings],
          bridges: [filter.bridges],
          parking: [filter.parking],
          footing: [filter.footing]
        });
      }
    });
  }

  onSubmit() {
    const values: TrailSearchFormValues = this.myForm.value;
    this.submitForm.emit(values);
  }

}

export interface TrailSearchFormValues {
  name: string;
  difficulty: string;
  waterCrossings: string;
  bridges: string;
  parking: string;
  footing: string;
}
