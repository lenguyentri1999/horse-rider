import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { RequestNewCampComponent } from 'src/app/components/request-new-camp/request-new-camp.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  constructor(
    protected popoverCtrl: PopoverController,
  ) { }

  ngOnInit() {
  }

  async onSubmitNewCampRequest() {
    const popover = await this.popoverCtrl.create({
      component: RequestNewCampComponent,
    });
    popover.present();
  }

}
