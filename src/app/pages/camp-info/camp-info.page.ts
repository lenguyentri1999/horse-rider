import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camp } from 'src/models/camp';

@Component({
  selector: 'app-camp-info',
  templateUrl: './camp-info.page.html',
  styleUrls: ['./camp-info.page.scss'],
})
export class CampInfoPage implements OnInit {
  camp: Camp;

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(_ => {
      const state = this.router.getCurrentNavigation().extras.state;
      if (state) {
        this.camp = state.camp;
      }
    });
  }
}
