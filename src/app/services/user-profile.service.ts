import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { UserData } from 'src/models/userData';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private readonly defaultName = 'Anonymous';
  private readonly defaultPhotoUrl = 'assets/blank-profile-picture.png';

  constructor(
    protected db: DbService
  ) { }

  getUserProfile(userID: string): Observable<UserData> {
    return this.db.getObjectValues<UserData>(`users/${userID}`).pipe(
      map(userData => {
        if (!userData.name) {
          userData.name = this.defaultName;
        }

        if (!userData.photoUrl) {
          userData.photoUrl = this.defaultPhotoUrl;
        }

        return userData;
      })
    );
  }
}
