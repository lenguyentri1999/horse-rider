import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DbService } from 'src/app/services/db.service';
import { Camp } from 'src/models/camp';
import { MapboxService, MapboxSearchResult } from 'src/app/services/mapbox.service';
import { MapboxPlace } from 'src/models/mapboxResult';
import { CampService } from 'src/app/services/camp.service';
import { ToastController, ModalController } from '@ionic/angular';
import { AutoCompleteComponent } from 'ionic4-auto-complete';

@Component({
  selector: 'app-add-camp',
  templateUrl: './add-camp.component.html',
  styleUrls: ['./add-camp.component.scss'],
})
export class AddCampComponent implements OnInit, AfterViewInit {
  @ViewChild('addressSearchbar', { static: false }) addressSearchBar: AutoCompleteComponent;
  myForm: FormGroup;

  // If camp is not null, then in edit mode
  camp: Camp;

  constructor(
    public mapboxService: MapboxService,
    protected db: DbService,
    protected campService: CampService,
    protected fb: FormBuilder,
    protected toastCtrl: ToastController,
    protected modalCtrl: ModalController,
  ) { }

  private isEditMode(): boolean {
    return this.camp != null;
  }

  ngOnInit() {
    let name = '';
    let description = '';
    let address = '';
    let url = '';
    let pictureUrl = '';
    let coords = null;
    let attributes: Camp['attributes'] = {
      bigRigFriendly: false,
      facilityCleanliness: false,
      wifi: false,
      horseFacilities: false
    };

    if (this.isEditMode()) {
      name = this.camp.name;
      description = this.camp.description;
      address = this.camp.address;
      coords = this.camp.coords;
      url = this.camp.url;
      pictureUrl = this.camp.pictures && this.camp.pictures.length > 0 ? this.camp.pictures[0] : '';
      attributes = this.camp.attributes;
    }

    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

    this.myForm = this.fb.group({
      name: [name, Validators.required],
      description: [description, Validators.required],
      address: [address, Validators.required],
      coords: [coords, Validators.required],
      url: [url, [Validators.required, Validators.pattern(reg)]],
      pictureUrl: [pictureUrl, [Validators.required]],
      bigRigFriendly: [attributes.bigRigFriendly, Validators.required],
      facilityCleanliness: [attributes.facilityCleanliness, Validators.required],
      wifi: [attributes.wifi, Validators.required],
      horseFacilities: [attributes.horseFacilities, Validators.required],
    });
  }

  ngAfterViewInit() {
    if (this.isEditMode()) {
      this.addressSearchBar.keyword = this.camp.address;
    }
  }

  onLocationSelected(result: MapboxSearchResult) {
    const place = result.place;
    this.myForm.get('address').setValue(place.place_name);
    this.myForm.get('coords').setValue({
      long: place.geometry.coordinates[0],
      lat: place.geometry.coordinates[1]
    });
  }

  async submit() {
    const campID = this.isEditMode() ? this.camp.id : this.db.uuidv4();

    const camp: Camp = {
      id: campID,
      name: this.myForm.get('name').value,
      description: this.myForm.get('description').value,
      address: this.myForm.get('address').value,
      coords: {
        long: this.myForm.get('coords').value.long,
        lat: this.myForm.get('coords').value.lat,
      },
      url: this.myForm.get('url').value,
      pictures: [
        this.myForm.get('pictureUrl').value,
      ],
      attributes: {
        bigRigFriendly: this.myForm.get('bigRigFriendly').value,
        facilityCleanliness: this.myForm.get('facilityCleanliness').value,
        wifi: this.myForm.get('wifi').value,
        horseFacilities: this.myForm.get('horseFacilities').value
      }
    };

    this.campService.tryAddNew(camp).subscribe(async (success) => {
      if (success) {
        this.onSuccessAlert();
        this.modalCtrl.dismiss();
      } else {
        this.onFailureAlert();
      }
    });
  }

  private async onSuccessAlert() {
    const msg = this.isEditMode() ? 'Camp edited!' : 'Camp added!';
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

  private async onFailureAlert() {
    const toast = await this.toastCtrl.create({
      message: 'Error!',
      duration: 2000
    });
    toast.present();
  }

  public onCloseButton() {
    this.modalCtrl.dismiss();
  }

}
