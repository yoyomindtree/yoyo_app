import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserModel } from '../model/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { LoginService } from '../services/login.service';
import { FirebaseService } from '../services/firebase.service';
import { tap, take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  user: UserModel;
  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private loginSerivce: LoginService,
  ) {
    /**
     * getting the currently logged in user from firebase
     * service based on username
     */
    // const username = firebase.auth().currentUser.email;
    // this.firebaseService.getSingleUser(username).subscribe(data =>
    //   this.user = Object.values(data)[0] as UserModel
    // );
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    // is user logged in and check for admin
    // is user logged in and check for user
    // is user logged in
    return this.angularFireAuth.authState.pipe(
      take(1),
      map((user) => {
        return !!user;
      }),
      tap((loggedin) => {
        if (!loggedin) {
          this.router.navigate(['/login']);
        }
      }),
    );
  }
}
