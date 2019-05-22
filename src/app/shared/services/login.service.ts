import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// firebase imports
import { auth, User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserModel } from '../model/user.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private user: User;
  private userDetails: UserModel;
  public registerWithEmailAndPassword(credentials): Promise<auth.UserCredential> {
    const email = credentials.email;
    const password = credentials.password;
    return this.authService.auth.createUserWithEmailAndPassword(email, password);
  }

  public loginWithEmailAndPassword(credentials): Promise<auth.UserCredential>{
    const email = credentials.email;
    const password = credentials.password;
    return this.authService.auth.signInWithEmailAndPassword(email, password);
  }

  constructor(private authService: AngularFireAuth,
              private httpClient: HttpClient,
              private router: Router) {
    this.authService.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
   }

   public getUser(): UserModel {
     return this.userDetails;
   }

   public setUSer(userDetails: UserModel): void {
      this.userDetails = userDetails;
   }

  /**
   * method to login with google
   */
  public loginInWithGoogle(): Promise<auth.UserCredential> {
    return this.authService.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  /**
   * method to log out
   */
  public logOut() {
    this.authService.auth.signOut();
    this.router.navigate(['/login']);
  }
// tobe removed
  public getUserByUserName(userName) {
    return this.httpClient.get(environment.firebaseConfig.databaseURL + '/User-List.json/?orderBy="userName"&equalTo="' + userName + '"');
  }
}
