import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// firebase imports
import { auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
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
    this.authService.auth.signOut();
  }
}
