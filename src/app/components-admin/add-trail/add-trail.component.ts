import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-trail',
  templateUrl: './add-trail.component.html',
  styleUrls: ['./add-trail.component.scss'],
})

export class AddTrailComponent implements OnInit {
  myForm: FormGroup;

  constructor(protected fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      difficulty: ['', Validators.required],
      waterCrossings: ['', Validators.required],
      parking: ['', Validators.required],
      footing: ['', Validators.required],
    });
  }

  submit(form) {
    console.log(form);
  }

}
