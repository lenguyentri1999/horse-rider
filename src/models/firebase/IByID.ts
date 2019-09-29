import { Observable } from 'rxjs';

export interface IByID<T> {
    getByID(id: string): Observable<T>;
}
