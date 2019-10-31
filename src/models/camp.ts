import { Url } from 'url';
import { Observable } from 'rxjs';

export interface Camp {
    id: string;
    name: string;
    address: string;
    description: string;
    url?: Url;
    attributes: {
        bigRigFriendly: boolean,
        facilityCleanliness: boolean,
        wifi: boolean,
        horseFacilities: boolean
    };
    coords?: Observable<{
        lat: number;
        long: number;
    }>;
    pictures?: Array<string>;
    distance?: Observable<number>;
}
