import { Observable } from 'rxjs';

export interface IAddNew<T> {
    tryAddNew(obj: T): Observable<boolean>;
}
