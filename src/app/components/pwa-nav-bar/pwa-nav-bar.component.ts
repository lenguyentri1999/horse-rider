import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

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
  ) { }

  ngOnInit() {
    this.isPwa = !(this.platform.is('ios') || this.platform.is('android'));
  }

  goToCamps() {
    this.router.navigate(['/tabs/tab1']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

}
