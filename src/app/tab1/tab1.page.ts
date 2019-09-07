import { Component } from '@angular/core';
import { CampService } from '../services/camp.service';
import { Camp } from 'src/models/camp';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  camps: Array<Camp>;

  constructor(
    protected campService: CampService
  ) {
    this.campService.getAll().subscribe(camps =>
      this.camps = camps
    );
  }
}
