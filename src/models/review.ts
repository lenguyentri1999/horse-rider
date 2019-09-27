export class Review {
    rating: number;
    description: string;
    campID: string;
    userID: string;
    dateTime: Date;

    constructor(rating: number, description: string, campID: string, userID: string, dateTime: Date) {
        this.rating = rating;
        this.description = description;
        this.campID = campID;
        this.userID = userID;
        this.dateTime = dateTime;
    }
}
