import { Injectable } from '@angular/core';
import { RegisteredUser } from 'src/models/user';
import { AngularFireAuth } from '@angular/fire/auth';

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

  public getUserId(): string {
    return this.isAuthenticated()
    ? this.afAuth.auth.currentUser.uid
    : '';
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
