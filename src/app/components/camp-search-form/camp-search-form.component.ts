import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommonFilter } from 'src/models/filter';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-camp-search-form',
  templateUrl: './camp-search-form.component.html',
  styleUrls: ['./camp-search-form.component.scss'],
})
export class CampSearchFormComponent implements OnInit {
  @Input() nameElementHidden: boolean;

  myForm: FormGroup;

  @Output() submitForm = new EventEmitter<CampSearchFormValues>();

  constructor(
    protected fb: FormBuilder,
    protected filterService: FilterService,
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: [''],
      bigRigFriendly: [false],
      petFriendly: [false],
      wifi: [false],
    });

    this.filterService.getCampAttributesFilter().subscribe(filter => {
      if (filter) {
        this.myForm = this.fb.group({
          name: [filter.name],
          bigRigFriendly: [filter.bigRigFriendly],
          petFriendly: [filter.petFriendly],
          wifi: [filter.wifi]
        });
      }
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
  petFriendly: boolean;
  wifi: boolean;
}
