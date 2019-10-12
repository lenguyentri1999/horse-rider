import { Url } from 'url';
import { Observable } from 'rxjs';

export interface Camp {
    id: string;
    name: string;
    address: string;
    coords: Observable<{
        lat: number;
        long: number;
    }>;
    description: string;
    url: Url;
    pictures: Array<string>;
    distance: Observable<number>;
    attributes: {
        bigRigFriendly: boolean,
        // petFriendly: number,
        facilityCleanliness: boolean,
        wifi: boolean,
        horseFacilities: boolean
    };
}
