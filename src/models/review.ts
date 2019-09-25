export class Review {
    rating: number;
    description: string;
    campID: string;
    userID: string;

    constructor(rating: number, description: string, campID: string, userID: string) {
        this.rating = rating;
        this.description = description;
        this.campID = campID;
        this.userID = userID;
    }
}
