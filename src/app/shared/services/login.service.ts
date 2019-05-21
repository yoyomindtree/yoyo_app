import { Injectable } from '@angular/core';
// firebase imports
import { auth, User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  user: User;
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

  constructor(private authService: AngularFireAuth) {
    this.authService.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
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
  }
}
