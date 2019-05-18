import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private authService: AngularFireAuth) {}
  LoginInWithGoogle() {
    return this.authService.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
}
