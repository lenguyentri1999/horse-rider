import { PhotoUrlWrapper } from '../photoModalOutput';
import { Review } from './review';
import { DbService } from 'src/app/services/db.service';

export class ReviewImgHandler {
    reviewID: string;
    preUploadedImgs: PhotoUrlWrapper[];

    constructor(review: Review, preUploadedImgs: PhotoUrlWrapper[]) {
        this.reviewID = review.id;
        this.preUploadedImgs = preUploadedImgs;
    }

    public async uploadPhotos(db: DbService): Promise<void> {
        if (!this.preUploadedImgs || this.preUploadedImgs.length == 0) {
            return;
        }
        else {
            const imgs = await Promise.all(db.uploadAllPhotos(this.preUploadedImgs));
            db.updateObjectAtPath(`reviews/review-imgs/${this.reviewID}`, imgs);
        }

    }
}