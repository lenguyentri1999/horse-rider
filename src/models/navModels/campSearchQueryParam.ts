export interface ICampSearchQueryParams {
    keyword: string;
    place: string;
}

export class CampSearchQueryParams implements ICampSearchQueryParams {
    keyword: string = '';
    place: string = '';

    constructor(obj: ICampSearchQueryParams) {
        if (!obj) {
            return;
        }

        if (obj.keyword) {
            this.keyword = obj.keyword;
        }

        if (obj.place) {
            this.place = obj.place;
        }
    }

}
