import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddCampComponent } from 'src/app/components-admin/add-camp/add-camp.component';
import { AddTrailComponent } from 'src/app/components-admin/add-trail/add-trail.component';
import { AddEventComponent } from 'src/app/components-admin/add-event/add-event.component';

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

  async addTrail() {
    const modal = await this.modalCtrl.create({
      component: AddTrailComponent
    });
    modal.present();
  }

  async addEvent() {
    const modal = await this.modalCtrl.create({
      component: AddEventComponent
    });
    modal.present();
  }
}
