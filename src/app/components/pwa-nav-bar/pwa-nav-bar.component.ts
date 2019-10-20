import { Component, OnInit } from '@angular/core';
import { Platform, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
// import { RegisterPage } from 'src/app/pages/register/register.page';
// import { LoginPage } from 'src/app/pages/login/login.page';

@Component({
  selector: 'app-pwa-nav-bar',
  templateUrl: './pwa-nav-bar.component.html',
  styleUrls: ['./pwa-nav-bar.component.scss'],
})
export class PwaNavBarComponent implements OnInit {
  isPwa: boolean;

  constructor(
    protected platform: Platform,
    protected router: Router,
    protected modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.isPwa = !(this.platform.is('ios') || this.platform.is('android'));
  }

  goToCamps() {
    this.router.navigate(['/tabs/tab1']);
  }

  async openLoginModal() {
    this.router.navigate(['login']);

    // const modal = await this.modalCtrl.create({
    //   component: LoginPage
    // });
    // await modal.present();
  }

  async openRegisterModal() {
    this.router.navigate(['register']);
    // const modal = await this.modalCtrl.create({ component: RegisterPage
    // });
    // await modal.present();
  }

}
