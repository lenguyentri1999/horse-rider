import { Component } from '@angular/core';
import { CampService } from '../../services/camp.service';
import { Camp } from 'src/models/camp';
import { Router, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  camps: Array<Camp>;

  constructor(
    protected campService: CampService,
    protected router: Router,
    protected navCtrl: NavController,
    protected authService: AuthService
  ) {
    this.campService.getAll().subscribe(camps =>
      this.camps = camps
    );
  }

  goToCampInfo(camp: Camp) {
    const navExtras: NavigationExtras = {
      state: {
        camp
      }
    };
    this.navCtrl.navigateForward(`camp-info`, navExtras);
  }
}
