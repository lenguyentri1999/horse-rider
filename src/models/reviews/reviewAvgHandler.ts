import { of, Observable } from 'rxjs';
import { TrailReviewAttributes } from './trailReview';
import { Review } from './review';
import { ReviewService } from 'src/app/services/review.service';
import { CampReviewAttributes } from './campReview';
import { CampService } from 'src/app/services/camp.service';
import { tap, map, switchMap } from 'rxjs/operators';

export class ReviewAvgHandler {

    private trailAttrs = {
        [TrailReviewAttributes.trailCondition]: of(0),
    }

    private campAttrs = {
        [CampReviewAttributes.bigRigFriendly]: of(0),
    }

    constructor(campID: Observable<string>, reviews: Observable<Review[]>, reviewService: ReviewService) {
    }

    public static GetCampAverages(
        campID: Observable<string>,
        reviews: Observable<Review[]>,
        reviewService: ReviewService
    ): ReviewAvgHandler {

        const avgHandler = new ReviewAvgHandler(campID, reviews, reviewService);
        return avgHandler;
    }

    public static GetTrailAverages(
        campID: Observable<string>,
        reviews: Observable<Review[]>,
        reviewService: ReviewService
    ): ReviewAvgHandler {

        const avgHandler = new ReviewAvgHandler(campID, reviews, reviewService);
        avgHandler.setTrailAttr(TrailReviewAttributes.trailCondition, campID, reviewService);

        return avgHandler;
    }

    private setTrailAttr(attr: TrailReviewAttributes, campID: Observable<string>, reviewService: ReviewService) {
        this.trailAttrs[attr] = campID.pipe(
            switchMap(campID => reviewService.getAverageRating(campID, attr))
        );
    }

    public getTrailAttr(attr: TrailReviewAttributes): Observable<number> {
        return this.trailAttrs[attr];
    }

    private setCampAttr(attr: CampReviewAttributes, campID: Observable<string>, reviewService: ReviewService) {
        this.campAttrs[attr] = campID.pipe(
            switchMap(campID => reviewService.getAverageRating(campID, attr))
        );
    }
}