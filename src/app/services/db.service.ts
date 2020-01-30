import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase, QueryFn } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase';
import { map, finalize } from 'rxjs/operators';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { PhotoUrlWrapper } from 'src/models/photoModalOutput';
import { ImageUploadTask } from 'src/models/firebase/imageUploadTask';

@Injectable({
  providedIn: 'root'
})

export class DbService {

  constructor(
    protected afDb: AngularFireDatabase,
    protected afStorage: AngularFireStorage,
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
    return this.afDb.list<T>(environment.firebasePath + path, query).valueChanges().pipe(
      // map(value => {
      //   return value ? value : [];
      // })
    );
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

  public getImageUrl(path: string, file: File): { ref: AngularFireStorageReference, task: AngularFireUploadTask } {
    const storageRef = this.afStorage.ref(environment.firebasePath + "images/" + path);
    const task = storageRef.put(file);
    return {
      task,
      ref: storageRef
    };
  }

  public removeAtPath(path: string): Promise<void> {
    return this.afDb.database.ref(environment.firebasePath + path).remove();
  }

  public uploadAllPhotos(wrappers: PhotoUrlWrapper[]): Promise<string>[] {
    const imageUploadTasks: ImageUploadTask[] = wrappers.map(wrapper => {
      if (wrapper.isLocal) {
        const data = this.getImageUrl(this.uuidv4(), wrapper.file);
        return ImageUploadTask.getLocalImage(data.ref, data.task);
      } else {
        return ImageUploadTask.getUploadedImage(wrapper.url);
      }
    });
    return imageUploadTasks.map(t => t.getUrl());
  }
}
