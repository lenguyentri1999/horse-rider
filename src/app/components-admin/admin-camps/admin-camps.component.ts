import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Camp } from 'src/models/camp';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap, first } from 'rxjs/operators';
import { CampService } from 'src/app/services/camp.service';

@Component({
  selector: 'app-admin-camps',
  templateUrl: './admin-camps.component.html',
  styleUrls: ['./admin-camps.component.scss'],
})
export class AdminCampsComponent implements OnInit {
  dataSource$: Observable<Camp[]>;
  isTrail: Observable<boolean>;

  p = 1;

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected campService: CampService,
  ) {

    this.isTrail = this.route.paramMap.pipe(
      map(param => param.get('source') === 'trails')
    );
    this.dataSource$ = this.isTrail.pipe(
      switchMap(val => val ? this.campService.getAllHorseCampsAsList() : this.campService.getAllHorseTrailsAsList())
    )

  }

  ngOnInit() { }

  onAddCampsButton() {
    this.isTrail.pipe(
      first(),
    ).subscribe(val => {
      if (val) {
        this.router.navigate(['/admin/add/trail'])
      } else {
        this.router.navigate(['/admin/add/camp']);
      }
    })
  }

  onPageChange(page: number) {
    this.p = page;
    // if (this.content) {
    //   this.content.scrollToTop();
    // }
  }

}
