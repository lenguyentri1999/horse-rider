import { Injectable } from '@angular/core';
import { User } from 'src/models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { map, switchMap, flatMap } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { DbService } from './db.service';
import { UserData } from 'src/models/userData';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    protected afAuth: AngularFireAuth,
    public dbService: DbService,
  ) { }

  private isAuthenticated(): boolean {
    return this.afAuth.auth.currentUser != null;
  }

  public getUserId(): string | undefined {
    return this.isAuthenticated()
      ? this.afAuth.auth.currentUser.uid
      : undefined;
  }

  public tryGetUserId(): Observable<string | undefined> {
    return this.afAuth.user.pipe(
      map(user => user ? user.uid : undefined)
    );
  }

  public isAdmin(): Observable<boolean> {
    return this.tryGetUserId().pipe(
      switchMap(userID => {
      return this.dbService.getObjectValues<boolean>(`admin/${userID}`).pipe(
        map(value => value ? true : false)
      );
      })
    );
  }

  public isAuthorized(): Observable<boolean> {
    return this.afAuth.user.pipe(
      map(user => {
        return (user) ? true : false;
      })
    );
  }

  public async register(user: User): Promise<firebase.auth.UserCredential> {
    const r = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
    await r.user.updateProfile({
      displayName: user.name,
    });

    this.setUserData(r.user.uid, {name: user.name});
    return r;
  }

  public async setUserData(uid: string, data: UserData) {
    await this.dbService.setObjectAtPath(`users/${uid}`, data);
  }

  public async login(user: User): Promise<firebase.auth.UserCredential> {
    const r = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    return r;
  }

  public async googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);

    const data: UserData = {
      name: credential.user.displayName,
      photoUrl: credential.user.photoURL
    };

    await this.setUserData(credential.user.uid, data);

    return credential;
  }

  public async facebookLogin() {
    const provider = new auth.FacebookAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);

    const data: UserData = {
      name: credential.user.displayName,
      photoUrl: credential.user.photoURL
    };

    await this.setUserData(credential.user.uid, data);

    return credential;
  }

  public logout(): Promise<void> {
    return this.afAuth.auth.signOut();
  }
}
