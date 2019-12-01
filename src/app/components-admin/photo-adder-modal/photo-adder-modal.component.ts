import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-photo-adder-modal',
  templateUrl: './photo-adder-modal.component.html',
  styleUrls: ['./photo-adder-modal.component.scss'],
})
export class PhotoAdderModalComponent implements OnInit {
  myForm: FormGroup;

  constructor(
    protected fb: FormBuilder,
    protected modalCtrl: ModalController,
    protected navParams: NavParams,
  ) { 
    let urlToBeEdited = this.navParams.get('url') || '';

    this.myForm = this.fb.group({
      url: [urlToBeEdited, Validators.required],
    })
  }

  ngOnInit() {}

  submit() {
    const data: PhotoModalOutput = this.myForm.getRawValue();
    this.modalCtrl.dismiss(data);
  }

  cancel() {
    this.modalCtrl.dismiss();

  }

}

export interface PhotoModalOutput {
  url: string
};