import { Injectable, Output, EventEmitter } from '@angular/core';

// firebase imports
import { auth, User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

import { UserModel } from '../model/user.model';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public getLoggedInName = new BehaviorSubject(null);
  private user: User;
  private userDetails: UserModel;
  constructor(private authService: AngularFireAuth, private router: Router, private currentRoute: ActivatedRoute) {
    const userEmail = sessionStorage.getItem('email');
    if (userEmail) {
      this.getLoggedInName.next(userEmail);
    }
  }

  /**
   * property validation messgaes.
   */
  public account_validation_messages = {
    username: [
      { type: 'required', message: 'Username is required' },
      { type: 'minLength', message: 'Username must be at least 5 characters long' },
      { type: 'maxLength', message: 'Username cannot be more than 25 characters long' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters' },
      { type: 'validUsername', message: 'Your username has already been taken' },
    ],
    email: [{ type: 'required', message: 'Email is required' }, { type: 'pattern', message: 'Enter a valid email' }],
    confirm_password: [{ type: 'areEqual', message: 'Password mismatch' }],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'minLength', message: 'Password must be at least 5 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' },
    ],
    terms: [{ type: 'pattern', message: 'You must accept terms and conditions' }],
    phone: [{ type: 'required', message: 'phone is required' }, { type: 'minLength', message: 'Should be 10 digits' }],
  };

  /**
   * method to register the user with email and passweord.
   * @param credentials :credentials provided by the user form
   */
  public registerWithEmailAndPassword(credentials: any): Promise<auth.UserCredential> {
    const email = credentials.email;
    const password = credentials.password;
    return this.authService.auth.createUserWithEmailAndPassword(email, password);
  }

  /**
   * method to sign in with the email and password
   * @param credentials ->credentials provided by the user on form
   */
  public loginWithEmailAndPassword(credentials: any): Promise<auth.UserCredential> {
    const email = credentials.email;
    const password = credentials.password;
    return this.authService.auth.signInWithEmailAndPassword(email, password);
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

  public logOut(): void {
    this.authService.auth.signOut();
    this.router.navigate(['../../login'], { relativeTo: this.currentRoute });
  }
}
