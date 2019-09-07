import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase, QueryFn } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(
    protected afDb: AngularFireDatabase,
  ) { }

  public getObjectValues<T>(path: string): Observable<T> {
    return this.afDb.object<T>(environment.firebasePath + path).valueChanges();
  }

  public setObjectAtPath(path: string, object): Promise<void> {
    return this.afDb.object(environment.firebasePath + path).set(object);
  }

  public appendObjectAtPath(path: string, object): firebase.database.ThenableReference {
    return this.afDb.list(environment.firebasePath + path).push(object);
  }

  public pushObjectAtPath(path: string, object): firebase.database.ThenableReference {
    return this.afDb.database.ref(environment.firebasePath + path).push(object);
  }
  public getListSortedByFunction<T>(path: string, query: QueryFn = null): Observable<T[]> {
    return this.afDb.list<T>(environment.firebasePath + path, query).valueChanges();
  }

  public updateObjectAtPath(path: string, object): Promise<void> {
    return this.afDb.database.ref(environment.firebasePath + path).update(object);
  }

  public getFile(path: string): Promise<any> {
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(environment.firebasePath + path);
    return fileRef.getDownloadURL()
      .then(data => data, err => err);
  }

  public uploadFile(path: string, blob: string): Promise<any> {
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(environment.firebasePath + path);
    return fileRef.putString(blob, 'data_url')
      .then(data => data, err => err);
  }
}
