import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DbService } from 'src/app/services/db.service';
import { Camp } from 'src/models/camp';
import { MapboxService, MapboxSearchResult } from 'src/app/services/mapbox.service';
import { MapboxPlace } from 'src/models/mapboxResult';
import { CampService, SourceEnum } from 'src/app/services/camp.service';
import { ToastController, ModalController, AlertController } from '@ionic/angular';
import { AutoCompleteComponent } from 'ionic4-auto-complete';
import { TrailDifficulty, TrailWaterCrossings, TrailFooting, TrailParkingForRigs, TrailBridges } from 'src/models/enums/trail-review-enums';
import { Observable, of, forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap, map, first } from 'rxjs/operators';
import { PhotoUrlWrapper } from 'src/models/photoModalOutput';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { ImageUploadTask } from 'src/models/firebase/imageUploadTask';
import { environment } from 'src/environments/environment';
import { Coords } from 'src/models/coords';
import { OverlayEventDetail } from '@ionic/core';

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
    protected router: Router,
    protected alertCtrl: AlertController,
  ) {
    this.type = this.route.paramMap.pipe(
      map(params => params.get('type')),
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
    let phoneNumber = '';
    let pictureUrl: PhotoUrlWrapper[] = [];
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
      phoneNumber = this.camp.phoneNumber;
      pictureUrl = this.camp.pictures.map(url => PhotoUrlWrapper.getAlreadyUploadedImage(url));
      attributes = this.camp.attributes || attributes;
    }

    this.myForm = this.fb.group({
      name: [name, Validators.required],
      description: [description, Validators.required],
      address: [address, Validators.required],
      coords: [coords, Validators.required],
      url: [url, [Validators.required]],
      phoneNumber: [phoneNumber, Validators.required],
      pictureUrl: [pictureUrl],

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

  onPhotoUrlsChange(urls: PhotoUrlWrapper[]) {
    this.myForm.get('pictureUrl').setValue(urls);
  }

  uploadAllPhotos(wrappers: PhotoUrlWrapper[]): Promise<string>[] {
    const imageUploadTasks: ImageUploadTask[] = wrappers.map(wrapper => {
      if (wrapper.isLocal) {
        const data = this.db.getImageUrl(this.db.uuidv4(), wrapper.file);
        return ImageUploadTask.getLocalImage(data.ref, data.task);
      } else {
        return ImageUploadTask.getUploadedImage(wrapper.url);
      }
    });
    return imageUploadTasks.map(t => t.getUrl());
  }

  async checkForDuplicates(center: Coords, distance = 10) {
    const filteredCamps = await this.campService.getAllAsList().pipe(
      map(camps => camps.filter(camp => {
        const d = this.mapboxService.straightLineDistance(center, camp.coords);
        console.log(d);
        return d < distance;
      })),
      first(),
    ).toPromise();

    // found some camps within the set distance
    if (filteredCamps.length > 0) {

      // tslint:disable-next-line:max-line-length
      let message = `We found these camps already on the database within ${distance} miles of where you added, please check to make sure that you are not adding duplicates: <br>`;

      message += `
      <ul>
      ${filteredCamps.map(camp => '<li>' + camp.name + '</li>')}
      </ul>`;

      const alert = await this.alertCtrl.create({
        message,
        buttons: [
          {
            text: `I'm sure, go ahead and add!`,
            handler: () => {
              alert.dismiss(true);
              return false;
            }
          },
          {
            text: 'Cancel',
            handler: () => {
              alert.dismiss(false);
              return false;
            }
          }
        ]
      });
      alert.present();
      return alert.onDidDismiss().then((val: OverlayEventDetail<boolean>) => val.data);
    } else {
      return true;
    }
  }

  async submit() {
    if (!this.isEditMode()) {
      const passDuplicateCheck = await this.checkForDuplicates(this.myForm.get('coords').value);
      if (!passDuplicateCheck) {
        return;
      }
    }

    const campID = this.isEditMode() ? this.camp.id : this.db.uuidv4();

    // Upload all photos that are local
    const urlWrappers: PhotoUrlWrapper[] = this.myForm.get('pictureUrl').value;
    const pictureUrls = await Promise.all(this.uploadAllPhotos(urlWrappers));

    const passPictureCheck = pictureUrls.length > 0;
    if (!passPictureCheck) {
      alert('You must add at least one picture!');
      return;
    }

    this.myForm.get('pictureUrl').setValue(pictureUrls);

    // Populate camp object
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
      phoneNumber: this.myForm.get('phoneNumber').value,
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
        // this.openNewTab(camp);
        return;
      }
      if (type === 'trail') {
        this.addTrail(camp);
        // this.openNewTab(camp);
      }
    });
  }

  private openNewTab(camp: Camp) {
    window.open(environment.baseUrl + `/camp-info/${camp.id}`, '_blank');
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
    // this.myForm.reset();
    // this.myForm.get('pictureUrl').setValue([]);
    this.modalCtrl.dismiss();
  }

}
