import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

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
