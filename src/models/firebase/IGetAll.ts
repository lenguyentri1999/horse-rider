import { Observable } from 'rxjs';

export interface IGetAll<T> {
    getAll(): Observable<T[]>;
}
