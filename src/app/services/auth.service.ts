import { Injectable } from '@angular/core';
import { RegisteredUser } from 'src/models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  public async register(user: RegisteredUser): Promise<firebase.auth.UserCredential> {
    const r = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
    return r;
  }

  public async login(user: RegisteredUser): Promise<firebase.auth.UserCredential> {
    const r = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    return r;
  }

  public logout() {
    this.afAuth.auth.signOut();
  }
}
