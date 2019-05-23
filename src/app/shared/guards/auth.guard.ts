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
    private router: Router
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
    next: ActivatedRouteSnapshot
  ): Observable<boolean> {
    // is user logged in and check for admin
    // is user logged in and check for user
    // is user logged in
    return Observable.create((observer: any) => {
      if (sessionStorage.getItem('email') && sessionStorage.getItem('token')) {
        this.fetchUser(sessionStorage.getItem('email')).subscribe((userDetail) => {
          if (userDetail && userDetail[0] && userDetail[0].token === sessionStorage.getItem('token')) {
            if (((next.routeConfig.path === 'admin') && (userDetail[0].role === 'admin')) ||
              ((next.routeConfig.path === 'user') && (userDetail[0].role === 'user'))) {
              observer.next(true);
              observer.complete();
            } else {
              this.router.navigate(['/login']);
              sessionStorage.clear();
              observer.next(false);
              observer.complete();
            }
          } else {
            this.router.navigate(['/login']);
            sessionStorage.clear();
            observer.next(false);
            observer.complete();
          }
        }, (error) => {
          this.router.navigate(['/login']);
          sessionStorage.clear();
          observer.next(false);
          observer.complete();
        });
      } else {
        this.router.navigate(['/login']);
        sessionStorage.clear();
        observer.next(false);
        observer.complete();
      }
    });
  }

  public fetchUser(email: string): Observable<any> {
    return Observable.create((observer: any) => {
      this.firebaseService
        .getUserList()
        .snapshotChanges()
        .pipe(map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))))
        .subscribe(
          data => {
            observer.next(data.filter(users => users.userName === email));
            observer.complete();
          },
          (error) => {
            observer.next(false);
            observer.complete();
          }
        );
    });
  }
}
