import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DbService } from 'src/app/services/db.service';
import { Camp } from 'src/models/camp';
import { MapboxService } from 'src/app/services/mapbox.service';
import { MapboxPlace } from 'src/models/mapboxResult';
import { CampService } from 'src/app/services/camp.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-camp',
  templateUrl: './add-camp.component.html',
  styleUrls: ['./add-camp.component.scss'],
})
export class AddCampComponent implements OnInit {
  myForm: FormGroup;

  constructor(
    public mapboxService: MapboxService,
    protected db: DbService,
    protected campService: CampService,
    protected fb: FormBuilder,
    protected toastCtrl: ToastController,
    ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required],
      bigRigFriendly: [false, Validators.required],
      facilityCleanliness: [false, Validators.required],
      wifi: [false, Validators.required],
      horseFacilities: [false, Validators.required],
    });
  }

  onLocationSelected(place: MapboxPlace) {
    this.myForm.get('address').setValue(place.place_name);
  }

  async submit() {
    const campID = this.db.uuidv4();
    const camp: Camp = {
      id: campID,
      name: this.myForm.get('name').value,
      description: this.myForm.get('description').value,
      address: this.myForm.get('address').value,
      attributes: {
        bigRigFriendly: this.myForm.get('bigRigFriendly').value,
        facilityCleanliness: this.myForm.get('facilityCleanliness').value,
        wifi: this.myForm.get('wifi').value,
        horseFacilities: this.myForm.get('horseFacilities').value
      }
    };
    this.campService.tryAddNew(camp).subscribe(async (success) => {
      if (success) {
        const toast = await this.toastCtrl.create({
          message: 'Camp added!'
        });
        toast.present();

      } else {
        const toast = await this.toastCtrl.create({
          message: 'Camp was not added!'
        });
        toast.present();
      }
    });
  }

}
