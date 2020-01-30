import { Component, OnInit, Input } from '@angular/core';
import { Camp } from 'src/models/camp';
import { Observable, of } from 'rxjs';
import { CampService } from 'src/app/services/camp.service';
import { ReviewService } from 'src/app/services/review.service';
import { map, defaultIfEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-camp-card',
  templateUrl: './camp-card.component.html',
  styleUrls: ['./camp-card.component.scss'],
})
export class CampCardComponent implements OnInit {
  @Input() camp: Camp;
  avgRating: Observable<number>;
  numReviews: Observable<number>;

  constructor(
    protected campService: CampService,
    protected reviewService: ReviewService,
  ) { }

  ngOnInit() {
    this.avgRating = this.reviewService.getAverageRating(this.camp.id);
    this.numReviews = this.reviewService.getByCampID(this.camp.id).pipe(
      map(reviews => reviews.length)
    );
  }
}
