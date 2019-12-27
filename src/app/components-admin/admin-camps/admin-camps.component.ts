import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Camp } from 'src/models/camp';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap, first, tap } from 'rxjs/operators';
import { CampService } from 'src/app/services/camp.service';
import { MapboxService } from 'src/app/services/mapbox.service';
import { MapboxContext } from 'src/models/mapboxResult';
import { AddCampComponent } from '../add-camp/add-camp.component';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-admin-camps',
  templateUrl: './admin-camps.component.html',
  styleUrls: ['./admin-camps.component.scss'],
})
export class AdminCampsComponent implements OnInit {
  dataSource$: Observable<Camp[]>;
  originalDataSource$: Observable<Camp[]>;
  isTrail: Observable<boolean>;
  title: Observable<string>;

  currQueries = {
    name: '',
    address: '',
    state: '',
    city: ''
  };
  queries: string[] = Object.keys(this.currQueries);

  p = 1;

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected modalCtrl: ModalController,
    protected alertCtrl: AlertController,
    protected campService: CampService,
    protected mapboxService: MapboxService,
  ) {

    this.isTrail = this.route.paramMap.pipe(
      map(param => param.get('source') === 'trails')
    );
    this.title = this.isTrail.pipe(
      map(isTrail => isTrail ? 'Trails' : 'Camps')
    );


    this.dataSource$ = this.isTrail.pipe(
      switchMap(isTrail => isTrail ?
        this.campService.getAllHorseTrailsAsList() :
        this.campService.getAllHorseCampsAsList()
      ),
    );

    this.originalDataSource$ = this.dataSource$;
  }

  ngOnInit() { }

  onAddCampsButton() {
    this.isTrail.pipe(
      first(),
    ).subscribe(isTrail => {
      if (isTrail) {
        this.router.navigate(['/admin/add/trail'])
      } else {
        this.router.navigate(['/admin/add/camp']);
      }
    })
  }

  onAnySearchBarChange($event) {
    this.dataSource$ = this.originalDataSource$.pipe(

      // Filter by name
      map(camps => {
        if (this.currQueries.name === '') { return camps };
        return camps.filter(camp => camp.name.toLowerCase().includes(this.currQueries.name.toLowerCase()))
      }),

      // Filter by address
      map(camps => {
        if (this.currQueries.address === '') { return camps };
        return camps.filter(camp => camp.address.toLowerCase().includes(this.currQueries.address.toLowerCase()))
      }),

      // Filter by city
      map(camps => {
        if (this.currQueries.city === '') { return camps };
        return camps.filter(camp => camp.city ? camp.city.toLowerCase().includes(this.currQueries.city.toLowerCase()) : false)
      }),

      // Filter by state
      map(camps => {
        if (this.currQueries.state === '') { return camps };
        return camps.filter(camp => camp.state ? camp.state.toLowerCase().includes(this.currQueries.state.toLowerCase()) : false)
      }),
    );
  }

  async onEditCampButtonClick(camp: Camp) {
    const modal = await this.modalCtrl.create({
      component: AddCampComponent,
      componentProps: {
        camp
      }
    });
    modal.present();
  }

  async onDeleteCampButtonClick(camp: Camp) {
    const alert = await this.alertCtrl.create({
      message: `Are you sure you want to delete ${camp.name}? This action is irreversible!`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.campService.delete(camp);
          }
        }
      ]
    })

    alert.present();
  }

  onPageChange(page: number) {
    this.p = page;
  }
}
