import { Component, OnInit, Input } from '@angular/core';
import { Camp } from 'src/models/camp';

@Component({
  selector: 'app-camp-card',
  templateUrl: './camp-card.component.html',
  styleUrls: ['./camp-card.component.scss'],
})
export class CampCardComponent implements OnInit {
  @Input() camp: Camp;

  constructor() { }

  ngOnInit() {}

}
