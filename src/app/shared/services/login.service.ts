import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// firebase imports
import { auth, User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserModel } from '../model/user.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router, Event } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public getLoggedInName = new BehaviorSubject(null);
  private user: User;
  private userDetails: UserModel;

  public account_validation_messages = {
    username: [
      { type: 'required', message: 'Username is required' },
      { type: 'minLength', message: 'Username must be at least 5 characters long' },
      { type: 'maxLength', message: 'Username cannot be more than 25 characters long' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters' },
      { type: 'validUsername', message: 'Your username has already been taken' },
    ],
    email: [{ type: 'required', message: 'Email is required' }, { type: 'pattern', message: 'Enter a valid email' }],
    confirm_password: [
      { type: 'areEqual', message: 'Password mismatch' },
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'minLength', message: 'Password must be at least 5 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' },
    ],
    terms: [{ type: 'pattern', message: 'You must accept terms and conditions' }],
    phone: [
      { type: 'required', message: 'phone is required'},
      { type: 'minLength', message: 'Should be 10 digits'}        ]
  };

  public registerWithEmailAndPassword(credentials): Promise<auth.UserCredential> {
    const email = credentials.email;
    const password = credentials.password;
    return this.authService.auth.createUserWithEmailAndPassword(email, password);
  }

  public loginWithEmailAndPassword(credentials): Promise<auth.UserCredential> {
    const email = credentials.email;
    const password = credentials.password;
    return this.authService.auth.signInWithEmailAndPassword(email, password);
  }

  constructor(private authService: AngularFireAuth, private httpClient: HttpClient, private router: Router) {
    const userEmail = sessionStorage.getItem('email');
    console.log("inside service:::::", userEmail);
    if (userEmail) {
      this.getLoggedInName.next(userEmail);
    }
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
}
