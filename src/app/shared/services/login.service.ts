import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

// firebase imports
import { auth, User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { UserModel } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // BehaviorSubject user
  user = new BehaviorSubject(null);
  constructor(private authService: AngularFireAuth, private angularFireDb: AngularFireDatabase) {
    authService.authState
      .pipe(
        map((data) => {
          if (data) {
            return this.angularFireDb.object<UserModel>('/User-List');
          } else {
            return of(null);
          }
        }),
      )
      .subscribe((data) => this.user.next(data));
  }
  /**
   * method to login with google
   */
  public LoginInWithGoogle(): Promise<auth.UserCredential> {
    return this.authService.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  /**
   * method to log out
   */
  public LogOut() {
    this.authService.auth.signOut();
  }
}
