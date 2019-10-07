import { Injectable } from '@angular/core';
import { Camp } from 'src/models/camp';
import { Page } from '@ionic/core';
import { CampInfoPage } from '../pages/camp-info/camp-info.page';

@Injectable({
  providedIn: 'root'
})
export class NavParamsService {
  campInfoParam: Camp;

  constructor() { }

  setParam(page: Page, param: any) {
    switch (page.name) {

      case CampInfoPage.name:
        this.campInfoParam = param;

    }
  }

  getParam(page: Page) {
    switch (page.name) {

      case CampInfoPage.name:
        return this.campInfoParam;

    }
  }
}
