import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Camp } from 'src/models/camp';
import { Observable, combineLatest, zip } from 'rxjs';
import { map, tap, flatMap, switchMap, take } from 'rxjs/operators';
import { ReviewService } from './review.service';
import { IGetAll } from 'src/models/firebase/IGetAll';
import * as stringSim from 'string-similarity';
import { StringMatch } from 'src/models/string-similarity/stringMatch';

@Injectable({
  providedIn: 'root'
})
export class CampService implements IGetAll<Camp> {

  constructor(
    protected db: DbService,
    protected reviewService: ReviewService,
  ) { }

  // Returns all camps
  public getAllAsMap(): Observable<Map<string, Camp>> {
    return this.db.getObjectValues(`camps`);
  }

  public getAllAsList(): Observable<Camp[]> {
    return this.db.getListSortedByFunction<Camp>(`camps`);
  }

  public filterByTerm(term: string, camps: Map<string, Camp>) {

    const campsArr = Object.keys(camps).map(id => camps[id]);

    const matches: { ratings: StringMatch[] } = stringSim.findBestMatch(term, campsArr.map(camp => this.campToStringSearch(camp)));

    // Sort each query by their rating in descending order and convert back to camps
    const sortedQueries = this.sortMatches(matches.ratings);
    const sortedCamps = sortedQueries
      .map(query => this.stringSearchToCampId(query.target))
      .map(id => camps[id]);
    return sortedCamps;
  }

  /** START REGION
   * Hacky way to implement string similarity search
   */

  // Sort by descding order (best match to worst)
  private sortMatches(matches: StringMatch[]): StringMatch[] {
    return matches.sort((a, b) => a.rating < b.rating ? 1 : -1);
  }

  private campToStringSearch(camp: Camp): string {
    return `${camp.id} ${camp.name}`;
    // return `${camp.id} ${camp.name} ${camp.description}`;
  }

  private stringSearchToCampId(s: string): string {
    return s.split(' ')[0];
  }
  // END REGION

  public getAverageRating(campID: string): Observable<number> {
    return this.reviewService.getAllReviewRatings(campID)
      .pipe(
        map(ratings => {
          if (ratings.length === 0) {
            return 0;
          }

          let sum = 0;
          ratings.forEach(rating => sum += rating);
          return sum / ratings.length;
        })
      );
  }
}
