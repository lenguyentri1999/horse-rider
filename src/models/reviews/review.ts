import { DbService } from 'src/app/services/db.service';
import { PhotoUrlWrapper } from '../photoModalOutput';

export interface Review {
    id: string;
    rating: number;
    description: string;
    campID: string;
    userID: string;
    dateTime: Date;
    submitReview(db: DbService);
}