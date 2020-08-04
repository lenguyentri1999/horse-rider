import { of, Observable } from 'rxjs';
import { TrailReviewAttributes } from './trailReview';
import { Review } from './review';
import { ReviewService } from 'src/app/services/review.service';
import { CampReviewAttributes } from './campReview';
import { CampService } from 'src/app/services/camp.service';
import { tap, map, switchMap } from 'rxjs/operators';

export class ReviewAvgHandler {

    private trailAttrs = {
        [TrailReviewAttributes.difficulty]: of(0),
        [TrailReviewAttributes.difficultyBridges]: of(0),
        [TrailReviewAttributes.difficultyWater]: of(0),
        [TrailReviewAttributes.footing]: of(0),
        [TrailReviewAttributes.parking]: of(0),
        [TrailReviewAttributes.trailCondition]: of(0),
    }

    private campAttrs = {
        [CampReviewAttributes.bigRigFriendly]: of(0),
        [CampReviewAttributes.facilityCleanliness]: of(0),
        [CampReviewAttributes.horseFacilities]: of(0),
        [CampReviewAttributes.petFriendly]: of(0),
        [CampReviewAttributes.wifi]: of(0),
    }

    constructor(campID: Observable<string>, reviews: Observable<Review[]>, reviewService: ReviewService) {
    }

    public static GetCampAverages(
        campID: Observable<string>,
        reviews: Observable<Review[]>,
        reviewService: ReviewService
    ): ReviewAvgHandler {

        const avgHandler = new ReviewAvgHandler(campID, reviews, reviewService);
        avgHandler.setCampAttr(CampReviewAttributes.bigRigFriendly, campID, reviewService);
        avgHandler.setCampAttr(CampReviewAttributes.facilityCleanliness, campID, reviewService);
        avgHandler.setCampAttr(CampReviewAttributes.horseFacilities, campID, reviewService);
        avgHandler.setCampAttr(CampReviewAttributes.petFriendly, campID, reviewService);
        avgHandler.setCampAttr(CampReviewAttributes.wifi, campID, reviewService);
        return avgHandler;
    }

    public static GetTrailAverages(
        campID: Observable<string>,
        reviews: Observable<Review[]>,
        reviewService: ReviewService
    ): ReviewAvgHandler {

        const avgHandler = new ReviewAvgHandler(campID, reviews, reviewService);
        avgHandler.setTrailAttr(TrailReviewAttributes.difficulty, campID, reviewService);
        avgHandler.setTrailAttr(TrailReviewAttributes.difficultyBridges, campID, reviewService);
        avgHandler.setTrailAttr(TrailReviewAttributes.difficultyWater, campID, reviewService);
        avgHandler.setTrailAttr(TrailReviewAttributes.footing, campID, reviewService);
        avgHandler.setTrailAttr(TrailReviewAttributes.parking, campID, reviewService);
        avgHandler.setTrailAttr(TrailReviewAttributes.trailCondition, campID, reviewService);

        return avgHandler;
    }

    public getTrailAttr(attr: TrailReviewAttributes): Observable<number> {
        return this.trailAttrs[attr];
    }

    public getCampAttr(attr: CampReviewAttributes): Observable<number> {
        return this.campAttrs[attr];
    }

    private setTrailAttr(attr: TrailReviewAttributes, campID: Observable<string>, reviewService: ReviewService) {
        this.trailAttrs[attr] = campID.pipe(
            switchMap(campID => reviewService.getAverageRating(campID, attr))
        );
    }

    private setCampAttr(attr: CampReviewAttributes, campID: Observable<string>, reviewService: ReviewService) {
        this.campAttrs[attr] = campID.pipe(
            switchMap(campID => reviewService.getAverageRating(campID, attr))
        );
    }
}