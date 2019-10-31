import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddCampComponent } from 'src/app/components-admin/add-camp/add-camp.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(
    protected modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }

  async addCamp() {
    const modal = await this.modalCtrl.create({
      component: AddCampComponent
    });
    modal.present();
  }

  addTrail() {

  }

}
