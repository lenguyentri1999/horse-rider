import { Review } from './review';
import { DbService } from 'src/app/services/db.service';

export class CampReview implements Review {
    // Review attributes
    rating: number;
    description: string;
    campID: string;
    userID: string;
    dateTime: Date;

    // Camp attributes
    bigRigFriendly: number = 5;
    petFriendly: number = 5;
    facilityCleanliness: number = 5;
    horseFacilities: number = 5;
    wifi: number = 5;

    constructor(campID: string, userID: string, rating: number, description: string) {
        this.campID = campID;
        this.userID = userID;
        this.rating = rating;
        this.description = description;
        this.dateTime = new Date();
    }

    public setCampAttribute(attr: CampReviewAttributes, rating: number) {
        this[attr] = rating;
    }

    public submitReview(db: DbService) {
        const writes: Map<string, object> = new Map<string, object>();
        const id = db.uuidv4();
        const ref = `reviews/camps/review-info/${id}`;
        const refByUid = `reviews/camps/review-by-uid/${this.userID}/${id}`;
        const refByCampID = `reviews/camps/review-by-campID/${this.campID}/${id}`;

        writes[ref] = this;
        writes[refByUid] = true;
        writes[refByCampID] = true;

        db.batchWrite(writes);
    }
}

export enum CampReviewAttributes {
  bigRigFriendly = 'bigRigFriendly',
  petFriendly = 'petFriendly',
  facilityCleanliness = 'facilityCleanliness',
  horseFacilities = 'horseFacilities',
  wifi = 'wifi',
}