import { Url } from 'url';
import { Observable } from 'rxjs';

export interface Camp {
    id: string;
    name: string;
    address: string;
    description: string;
    url?: string;
    attributes: {
        bigRigFriendly: boolean | false,
        facilityCleanliness: boolean | false,
        wifi: boolean | false,
        horseFacilities: boolean | false
    };
    coords?: Observable<{
        lat: number;
        long: number;
    }>;
    pictures?: Array<string>;
    distance?: Observable<number>;
}
