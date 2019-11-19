import { Injectable } from '@angular/core';
import { IAddNew } from 'src/models/firebase/IAddNew';
import { Blog } from 'src/models/blog';
import { Observable, from, of } from 'rxjs';
import { DbService } from './db.service';
import { catchError, flatMap } from 'rxjs/operators';
import { IGetAll } from 'src/models/firebase/IGetAll';

@Injectable({
  providedIn: 'root'
})
export class BlogService implements IAddNew<Blog>, IGetAll<Blog> {

  constructor(
    protected db: DbService,
  ) { }

  tryAddNew(blog: Blog): Observable<boolean> {
    const hashMap: Map<string, object> = new Map<string, object>();

    hashMap[`blogs/blogs-details/${blog.id}`] = blog;
    hashMap[`blogs/blogs-by-uid/${blog.uid}/${blog.id}`] = true;

    return from(this.db.batchWrite(hashMap)).pipe(
      catchError(_ => of(false)),
      flatMap(_ => of(true))
    );
  }

  getAllAsMap(): Observable<Map<string, Blog>> {
    return this.db.getObjectValues(`blogs/blogs-details/`);
  }

  getAllAsList(): Observable<Blog[]> {
    return this.db.getListSortedByFunction(`blogs/blogs-details/`, null);
  }
}