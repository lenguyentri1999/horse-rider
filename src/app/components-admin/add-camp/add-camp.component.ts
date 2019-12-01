import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DbService } from 'src/app/services/db.service';
import { Camp } from 'src/models/camp';
import { MapboxService, MapboxSearchResult } from 'src/app/services/mapbox.service';
import { MapboxPlace } from 'src/models/mapboxResult';
import { CampService, SourceEnum } from 'src/app/services/camp.service';
import { ToastController, ModalController } from '@ionic/angular';
import { AutoCompleteComponent } from 'ionic4-auto-complete';
import { TrailDifficulty, TrailWaterCrossings, TrailFooting, TrailParkingForRigs, TrailBridges } from 'src/models/enums/trail-review-enums';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap, map } from 'rxjs/operators';

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

  // Enums
  trailEnum: TrailDifficulty;
  TrailWaterCrossings: any = TrailWaterCrossings;

  type: Observable<string>;

  constructor(
    public mapboxService: MapboxService,
    protected db: DbService,
    protected campService: CampService,
    protected fb: FormBuilder,
    protected toastCtrl: ToastController,
    protected modalCtrl: ModalController,
    protected route: ActivatedRoute,
  ) {
    this.type = this.route.paramMap.pipe(
      map(params => params.get('type')),
      // tap(type => console.log(type)),
    );
  }

  private isEditMode(): boolean {
    return this.camp != null;
  }

  populateForm() {
    let name = '';
    let description = '';
    let address = '';
    let url = '';
    let pictureUrl: string[] = [];
    let coords = null;

    let attributes: Camp['attributes'] = {
      // Camp attributes
      bigRigFriendly: false,
      petFriendly: false,
      wifi: false,
      // Trail attributes
      difficulty: TrailDifficulty.Easy.toString(),
      waterCrossings: TrailWaterCrossings.Puddles.toString(),
      footing: TrailFooting.Carriage.toString(),
      parking: TrailParkingForRigs.Plenty.toString(),
      bridges: TrailBridges.Low.toString(),
    };

    if (this.isEditMode()) {
      name = this.camp.name;
      description = this.camp.description;
      address = this.camp.address;
      coords = this.camp.coords;
      url = this.camp.url;
      pictureUrl = this.camp.pictures;
      attributes = this.camp.attributes;
    }

    // const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

    this.myForm = this.fb.group({
      // type: [type, Validators.required],
      name: [name, Validators.required],
      description: [description, Validators.required],
      address: [address, Validators.required],
      coords: [coords, Validators.required],
      url: [url, [Validators.required]],
      pictureUrl: [pictureUrl, [Validators.required]],

      // Camp attributes
      // bigRigFriendly: [attributes.bigRigFriendly],
      // petFriendly: [attributes.petFriendly],
      // wifi: [attributes.wifi],

      // Trail attributes
      bridges: [attributes.bridges],
      parking: [attributes.parking],
      footing: [attributes.footing],
      difficulty: [attributes.difficulty],
      waterCrossings: [attributes.waterCrossings],
    });
  }

  ngOnInit() {
    this.populateForm();

    if (this.isEditMode()) {
      this.campService.isTrail(this.camp).subscribe(
        val => {
          if (val) {
            this.type = of('trail');
          } else {
            this.type = of('camp');
          }
        }
      );
    }
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

  onPhotoUrlsChange(urls: string[]) {
    this.myForm.get('pictureUrl').setValue(urls);
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
      pictures: this.myForm.get('pictureUrl').value,
      attributes: {
        // bigRigFriendly: this.myForm.get('bigRigFriendly').value,
        // petFriendly: this.myForm.get('petFriendly').value,
        // wifi: this.myForm.get('wifi').value,

        difficulty: this.myForm.get('difficulty').value,
        parking: this.myForm.get('parking').value,
        bridges: this.myForm.get('bridges').value,
        footing: this.myForm.get('footing').value,
        waterCrossings: this.myForm.get('waterCrossings').value
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

    this.type.subscribe(type => {
      if (type === 'camp') {
        this.addCamp(camp);
        return;
      }
      if (type === 'trail') {
        this.addTrail(camp);
      }
    });
  }

  private addCamp(camp: Camp) {
    this.campService.addToCampTable(camp);
  }

  private addTrail(trail: Camp) {
    this.campService.addToTrailTable(trail);
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

  public onTypeChange($event) {
    console.log($event);
  }

  public cancel() {
    this.myForm.reset();
    this.myForm.get('pictureUrl').setValue([]);
    this.modalCtrl.dismiss();
  }

}
