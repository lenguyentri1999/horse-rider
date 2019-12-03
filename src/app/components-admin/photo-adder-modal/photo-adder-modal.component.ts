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

    this.myForm = this.fb.group({
      url: [urlToBeEdited, Validators.required],
      file: [null, Validators.required]
    })
  }

  ngOnInit() { }

  submit() {
    this.modalCtrl.dismiss(this.dataToBeDismissed);
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  onFileChange($event) {
    const file = $event.target.files[0];
    var reader = new FileReader();

    reader.readAsDataURL(file) // read file as data url

    reader.onload = (loadedFile) => { // called once readAsDataURL is completed
      if (loadedFile && loadedFile.target) {
        const fileUrl: string = loadedFile.target.result.toString();
        this.dataToBeDismissed = PhotoUrlWrapper.getLocalImage(fileUrl, file);

        this.myForm.get('url').setValue(loadedFile.target.result);
        this.myForm.get('file').setValue(file);
      }
    }

  }

}
