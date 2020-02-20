import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from 'src/models/reviews/review';
import { ReviewService } from 'src/app/services/review.service';
import { map, tap } from 'rxjs/operators';
import { CampService } from 'src/app/services/camp.service';

@Component({
  selector: 'app-admin-reviews',
  templateUrl: './admin-reviews.component.html',
  styleUrls: ['./admin-reviews.component.scss'],
})
export class AdminReviewsComponent implements OnInit {
  p: number = 1;

  dataSource$: Observable<Review[]> = new Observable<Review[]>();

  constructor(
    protected reviewService: ReviewService,
    protected campService: CampService,
  ) { }

  ngOnInit() {
    this.dataSource$ = this.reviewService.getAllAsList().pipe(
      map(reviews => reviews.reverse())
    )
  }

  getCampName(campID: string): Observable<string> {
    return this.campService.getByID(campID).pipe(
      map(camp => camp.name),
      tap(name => console.log(name))
    )
  }

  onPageChange(p: number) {
    this.p = p;
  }

}
