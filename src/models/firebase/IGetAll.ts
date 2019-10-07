import { Observable } from 'rxjs';

export interface IGetAll<T> {
    getAllAsMap(): Observable<Map<string, T>>;
    getAllAsList(): Observable<T[]>;
}
