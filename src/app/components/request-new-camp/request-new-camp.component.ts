import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbService } from 'src/app/services/db.service';
import { PopoverController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-request-new-camp',
  templateUrl: './request-new-camp.component.html',
  styleUrls: ['./request-new-camp.component.scss'],
})
export class RequestNewCampComponent implements OnInit {
  myForm: FormGroup;

  constructor(
    protected fb: FormBuilder,
    protected db: DbService,
    protected popoverCtrl: PopoverController,
    protected toastCtrl: ToastController,
  ) {
    this.myForm = this.fb.group({
      name: [''],
      address: [''],
      description: [''],
      url: [''],
      type: ['', Validators.required]
    });
  }

  ngOnInit() { }

  async submit() {
    await this.db.pushObjectAtPath(`newBusinessRequests`, this.myForm.value);
    const toast = await this.toastCtrl.create({
      message: 'Request submitted!',
      duration: 1500,
    });
    toast.present();
    this.popoverCtrl.dismiss();
  }

}
