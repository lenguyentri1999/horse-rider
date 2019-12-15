import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Platform, ModalController, AlertController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pwa-nav-bar',
  templateUrl: './pwa-nav-bar.component.html',
  styleUrls: ['./pwa-nav-bar.component.scss'],
})
export class PwaNavBarComponent implements OnInit {
  isPwa: boolean;
  isAuthorized: Observable<boolean>;
  isAdmin: Observable<boolean>;

  currPageName: string = 'Home';

  constructor(
    protected platform: Platform,
    protected router: Router,
    protected modalCtrl: ModalController,
    protected alertCtrl: AlertController,
    protected authService: AuthService,
    protected menuCtrl: MenuController,
  ) { }

  ngOnInit() {
    this.isPwa = !(this.platform.is('ios') || this.platform.is('android'));
    this.isAuthorized = this.authService.isAuthorized();
    this.isAdmin = this.authService.isAdmin();
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }

  async logOut() {
    const alert = await this.alertCtrl.create({
      header: 'Log out',
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          handler: () => {
            this.authService.logout().then(() => {
              this.router.navigate(['']);
            });
          }
        }
      ]
    });
    alert.present();
  }

  async routeAndCloseMenu(commands: [], currPageName: string = '') {
    this.router.navigate(commands);
    this.currPageName = currPageName;
    this.menuCtrl.toggle();
  }

}

interface Page {
  url: string;
  name: string;
}
