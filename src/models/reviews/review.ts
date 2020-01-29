import { DbService } from 'src/app/services/db.service';

export interface Review {
    rating: number;
    description: string;
    campID: string;
    userID: string;
    dateTime: Date;
    submitReview(db: DbService);
}