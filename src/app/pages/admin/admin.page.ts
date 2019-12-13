import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddCampComponent } from 'src/app/components-admin/add-camp/add-camp.component';
import { AddTrailComponent } from 'src/app/components-admin/add-trail/add-trail.component';
import { AddEventComponent } from 'src/app/components-admin/add-event/add-event.component';
import { AddBlogComponent } from 'src/app/components-admin/add-blog/add-blog.component';

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

}
