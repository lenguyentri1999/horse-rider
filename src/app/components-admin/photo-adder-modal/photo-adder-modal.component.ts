import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DbService } from 'src/app/services/db.service';
import { PhotoModalOutput, PhotoUrlWrapper } from 'src/models/photoModalOutput';

@Component({
  selector: 'app-photo-adder-modal',
  templateUrl: './photo-adder-modal.component.html',
  styleUrls: ['./photo-adder-modal.component.scss'],
})
export class PhotoAdderModalComponent implements OnInit {
  myForm: FormGroup;
  dataToBeDismissed: PhotoUrlWrapper;

  constructor(
    protected fb: FormBuilder,
    protected modalCtrl: ModalController,
    protected navParams: NavParams,
    protected db: DbService,
  ) {
    let urlToBeEdited = this.navParams.get('url') || '';
    // const isOnLocalImageInput = urlToBeEdited === '';

    this.myForm = this.fb.group({
      isOnLocalImageInput: [null],
      url: [urlToBeEdited, Validators.required],
      file: [null]
    })
  }

  ngOnInit() { }

  isOnLocalImageInput(): boolean {
    return this.myForm.get('isOnLocalImageInput').value;
  }

  submit(isLocal: boolean) {
    if (isLocal) {
      // TODO: Handle populating data to be dismisses here, move it from the onload function
    } else {
      this.dataToBeDismissed = PhotoUrlWrapper.getAlreadyUploadedImage(this.myForm.get('url').value);
    }

    this.modalCtrl.dismiss(this.dataToBeDismissed);
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  onFileChange($event) {
    const file: File = $event.target.files[0];
    var reader = new FileReader();

    reader.readAsDataURL(file) // read file as data url

    reader.onload = (loadedFile: any) => { // called once readAsDataURL is completed
      if (loadedFile && loadedFile.target && loadedFile.target.result) {
        const fileUrl: string = loadedFile.target.result.toString();
        loadedFile.target.result
        this.dataToBeDismissed = PhotoUrlWrapper.getLocalImage(fileUrl, file);

        this.myForm.get('url').setValue(loadedFile.target.result);
        this.myForm.get('file').setValue(file);
      }
    }

  }

}
