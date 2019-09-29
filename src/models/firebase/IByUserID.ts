import { Observable } from 'rxjs';

export interface IByUserID<T> {
    getByUserID(userID: string): Observable<T[]>;
}
