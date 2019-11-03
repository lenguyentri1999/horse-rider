import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-launch',
  templateUrl: './launch.page.html',
  styleUrls: ['./launch.page.scss'],
})
export class LaunchPage implements OnInit {
  email = '';

  constructor(
    protected dbService: DbService,
    protected loadCtrl: LoadingController,
    protected toastCtrl: ToastController,
  ) { }

  ngOnInit() {
  }

  public async onSubmitButtonClick() {
    if (this.email.trim() === '') {
      return;
    }
    this.dbService.pushObjectAtPath(`launch/emails/`, { email: this.email });

    const loader = await this.getLoadControl();
    loader.present();
    loader.onDidDismiss().then(async () => {
      const toast = await this.toastCtrl.create({
        message: 'Email added!',
        duration: 1000
      });
      toast.present();
      this.email = '';
    });
  }

  private async getLoadControl() {
    const loader = await this.loadCtrl.create({
      spinner: 'bubbles',
      duration: 1000,
      message: 'Please wait...'
    });
    return loader;
  }

}
