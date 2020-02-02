import { DbService } from 'src/app/services/db.service';

export enum ReviewAttrs {
    rating = 'rating',
}

export interface Review {
    id: string;
    rating: number;
    description: string;
    campID: string;
    userID: string;
    dateTime: Date;
    submitReview(db: DbService);
}