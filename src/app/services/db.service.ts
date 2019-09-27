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

  public uuidv4() {
    let d = new Date().getTime(); // Timestamp
    // tslint:disable-next-line:max-line-length
    let d2 = (performance && performance.now && (performance.now() * 1000)) || 0; // Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = Math.random() * 16; // random number between 0 and 16
      if (d > 0) { // Use timestamp until depleted
        // tslint:disable-next-line:no-bitwise
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {// Use microseconds since page-load if supported
        // tslint:disable-next-line:no-bitwise
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }
      // tslint:disable-next-line:no-bitwise
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

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

  public batchWrite(batch: Map<string, object>): Promise<void> {
    return this.afDb.database.ref(environment.firebasePath).update(batch);
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
