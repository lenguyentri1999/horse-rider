import { Observable } from 'rxjs';

export interface IByCampID<T> {
    getByCampID(campID: string): Observable<T[]>;
}
