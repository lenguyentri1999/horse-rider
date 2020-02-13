import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MapboxService } from 'src/app/services/mapbox.service';
import { MapboxPlace } from 'src/models/mapboxResult';
import { Router } from '@angular/router';
import { AutoCompleteComponent } from 'ionic4-auto-complete';
import { NavController, Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { CampSearchService, SearchResult } from 'src/app/services/camp-search.service';
import { TrailSearchFormValues } from 'src/app/components/trail-search-form/trail-search-form.component';
import { CampSearchFormValues } from 'src/app/components/camp-search-form/camp-search-form.component';
import { FilterService } from 'src/app/services/filter.service';
import { Observable } from 'rxjs';
import { Camp } from 'src/models/camp';
import { CampService } from 'src/app/services/camp.service';
import { map } from 'rxjs/operators';
import { ICampSearchQueryParams } from 'src/models/navModels/campSearchQueryParam';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})

export class LandingPage implements OnInit, AfterViewInit {
  @ViewChild('textSearch', { static: false }) searchBar: AutoCompleteComponent;
  @ViewChild('locationSearchBar', { static: false }) locationSearchBar: AutoCompleteComponent;
  environmentSetting: boolean = environment.production;
  environmentVersion: string = environment.version;
  isMobile: boolean;

  place: MapboxPlace;

  // 3 camps
  threeCamps: Observable<Camp[]>;
  threeTrails: Observable<Camp[]>;

  // Map data
  mapGeojsonData$: Observable<MapboxPlace[]>;
  readonly maxMarkers: number = 25;

  constructor(
    public mapboxService: MapboxService,
    public campSearchService: CampSearchService,
    protected filterService: FilterService,
    protected campService: CampService,
    protected router: Router,
    protected navCtrl: NavController,
    protected plt: Platform,
  ) {

    this.isMobile = this.plt.is('mobile');

    this.threeCamps = this.campService.getAllHorseCampsAsList().pipe(
      map(arr => arr.slice(0, 3))
    );

    this.threeTrails = this.campService.getAllHorseTrailsAsList().pipe(
      map(arr => arr.slice(0, 3))
    );

    this.mapGeojsonData$ = this.campService.getAllAsList().pipe(
      // map(camps => camps.slice(0, this.maxMarkers)),
      map(camps =>
        camps.map(camp => this.mapboxService.campToMapboxMarker(camp))
      )
    );

}

  ngOnInit() {
  }

  ngAfterViewInit() {
    // Populate default
    this.mapboxService.getDefaultPlace().subscribe(place => {
      this.locationSearchBar.keyword = place.place_name;
      this.place = place;
    });
  }

  onLocationSelected(place: MapboxPlace) {
    this.place = place;
  }

  onCampSelected(camp: SearchResult) {
    this.router.navigate(camp.navigateTo);
  }

  searchCamps() {
    this.mapboxService.setSearchQuery({ term: this.searchBar.keyword, place: this.place });
    const queries: ICampSearchQueryParams = {
      keyword: this.searchBar.keyword,
      place: this.locationSearchBar.keyword,
    }
    this.router.navigate(['tabs/places/camps'], { queryParams: queries});
  }

  onSearchTrails(values: TrailSearchFormValues) {
    this.filterService.setTrailAttributesFilter(values);
    this.router.navigate(['tabs/places/trails']);
  }

  onSearchCamps(values: CampSearchFormValues) {
    this.filterService.setCampAttributesFilter(values);
    this.router.navigate(['tabs/places/camps']);
  }
}
