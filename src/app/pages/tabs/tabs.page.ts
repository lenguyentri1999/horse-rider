import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  isMobile: boolean;

  constructor(
    protected platform: Platform,
  ) {
    this.isMobile = this.platform.is('ios') || this.platform.is('android');
  }

  ngOnInit() {
    if (!this.isMobile) {
      this.hideTabBar();
    } else {
      this.hideTopBar();
    }
  }

  private hideTopBar() {
    const topBar = document.querySelector('ion-toolbar');
    if (topBar !== null) {
      topBar.style.display = 'none';
    }
  }

  private hideTabBar() {
    const tabBar = document.querySelector('ion-tab-bar');
    if (tabBar !== null) {
      tabBar.style.display = 'none';
    }
  }

}
