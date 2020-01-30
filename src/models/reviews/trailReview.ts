import { Review } from './review';
import { DbService } from 'src/app/services/db.service';

export class TrailReview implements Review {
    // Review attributes
    id: string;
    rating: number;
    description: string;
    campID: string;
    userID: string;
    dateTime: Date;

    // Trail attributes
    difficulty: number = 5;
    parking: number = 5;
    footing: number = 5;
    trailCondition: number = 5;
    difficultyWater: number = 5;
    difficultyBridges: number = 5;

    constructor(id: string, campID: string, userID: string, rating: number, description: string) {
        this.id = id;
        this.campID = campID;
        this.userID = userID;
        this.rating = rating;
        this.description = description;
        this.dateTime = new Date();
    }

    public setTrailAttribute(attr: TrailReviewAttributes, rating: number) {
        this[attr] = rating;
    }

    public submitReview(db: DbService) {
        const writes: Map<string, object> = new Map<string, object>();
        const ref = `reviews/review-info/${this.id}`;
        const refByUid = `reviews/review-by-uid/${this.userID}/${this.id}`;
        const refByCampID = `reviews/review-by-campID/${this.campID}/${this.id}`;

        writes[ref] = this;
        writes[refByUid] = true;
        writes[refByCampID] = true;

        db.batchWrite(writes);
    }
}


export enum TrailReviewAttributes {
    difficulty = 'difficulty',
    parking = 'parking',
    footing = 'footing',
    trailCondition = 'trailCondition',
    difficultyWater = 'difficultyWater',
    difficultyBridges = 'difficultyBridges',
}