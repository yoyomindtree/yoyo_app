import { Injectable } from '@angular/core';
// firebase imports
import { auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public account_validation_messages = {
    username: [
      { type: 'required', message: 'Username is required' },
      { type: 'minlength', message: 'Username must be at least 5 characters long' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters' },
      { type: 'validUsername', message: 'Your username has already been taken' },
    ],
    email: [{ type: 'required', message: 'Email is required' }, { type: 'pattern', message: 'Enter a valid email' }],
    confirm_password: [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'areEqual', message: 'Password mismatch' },
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' },
    ],
    terms: [{ type: 'pattern', message: 'You must accept terms and conditions' }],
  };

  public registerWithEmailAndPassword(credentials): Promise<auth.UserCredential> {
    const email = credentials.email;
    const password = credentials.password;
    return this.authService.auth.createUserWithEmailAndPassword(email, password);
  }

  constructor(private authService: AngularFireAuth) {}
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
    this.authService.auth.signOut().then((data) => console.log());
  }
}
