import { Injectable } from '@angular/core';
import { User } from 'src/models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    protected afAuth: AngularFireAuth
  ) { }

  private isAuthenticated(): boolean {
    return this.afAuth.auth.currentUser != null;
  }

  public getUserId(): string | undefined {
    return this.isAuthenticated()
      ? this.afAuth.auth.currentUser.uid
      : undefined;
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
    return r;
  }

  public async login(user: User): Promise<firebase.auth.UserCredential> {
    const r = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    return r;
  }

  public async googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
  }

  public logout(): Promise<void> {
    return this.afAuth.auth.signOut();
  }
}
