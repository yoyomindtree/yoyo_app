import { FirebaseService } from '../services/firebase.service';
import { map } from 'rxjs/operators';

import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserModel } from '../model/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  userList = Array<UserModel>();
  constructor(private firebaseService: FirebaseService, private router: Router, private authService: AngularFireAuth) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.auth.currentUser) {
      return true;
    }
    return false;
  }
}
