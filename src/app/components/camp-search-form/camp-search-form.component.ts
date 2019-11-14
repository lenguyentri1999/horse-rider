import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-camp-search-form',
  templateUrl: './camp-search-form.component.html',
  styleUrls: ['./camp-search-form.component.scss'],
})
export class CampSearchFormComponent implements OnInit {
  myForm: FormGroup;

  @Output() submitForm = new EventEmitter<CampSearchFormValues>();

  constructor(
    protected fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: [''],
      bigRigFriendly: [true],
      facilityCleanliness: [true],
      wifi: [true],
      horseFacilities: [true],
    });
  }

  onSubmit() {
    const values: CampSearchFormValues = this.myForm.value;
    this.submitForm.emit(values);
  }

}

export interface CampSearchFormValues {
  name: string;
  bigRigFriendly: boolean;
  facilityCleanliness: boolean;
  wifi: boolean;
  horseFacilities: boolean;
}
