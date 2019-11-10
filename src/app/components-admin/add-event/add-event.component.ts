import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MapboxService } from 'src/app/services/mapbox.service';
import { MapboxPlace } from 'src/models/mapboxResult';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent implements OnInit {
  myForm: FormGroup;

  constructor(
    public mapboxService: MapboxService,
    protected fb: FormBuilder
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      address: ['', Validators.required],
      pictureUrl: ['', Validators.required],
    });
  }
 onLocationSelected(place: MapboxPlace) {
    this.myForm.get('address').setValue(place.place_name);
  }


  submit() {
    console.log(this.myForm.getRawValue());

  }

}
