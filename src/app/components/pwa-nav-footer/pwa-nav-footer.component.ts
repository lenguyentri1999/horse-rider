import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-pwa-nav-footer',
  templateUrl: './pwa-nav-footer.component.html',
  styleUrls: ['./pwa-nav-footer.component.scss'],
})
export class PwaNavFooterComponent implements OnInit {
  versionString = '';

  constructor(
    protected menuCtrl: MenuController,
  ) { }

  ngOnInit() {
    if (environment.production) {
      this.versionString = `V${environment.version}.0.0 P`;
    } else {
      this.versionString = `V${environment.version}.0.0 D`;
    }
  }


}
