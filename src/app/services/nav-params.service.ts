import { Injectable } from '@angular/core';
import { Camp } from 'src/models/camp';
import { Page } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class NavParamsService {
  campInfoParam: Camp;

  constructor() { }

  setParam(page: Page, param: any) {
    switch (page.name) {

      case 'CampInfoPage':
        this.campInfoParam = param;

    }
  }

  getParam(page: Page) {
    switch (page.name) {

      case 'CampInfoPage':
        return this.campInfoParam;

    }
  }
}
