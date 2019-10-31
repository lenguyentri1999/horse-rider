import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-camp',
  templateUrl: './add-camp.component.html',
  styleUrls: ['./add-camp.component.scss'],
})
export class AddCampComponent implements OnInit {
  myForm: FormGroup;

  constructor(protected fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      bigRigFriendly: [false, Validators.required],
      facilityCleanliness: [false, Validators.required],
      wifi: [false, Validators.required],
      horseFacilities: [false, Validators.required],
    });
  }

  submit(form) {
    console.log(form);
  }

}
