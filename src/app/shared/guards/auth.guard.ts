import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserModel } from '../model/user.model';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private firebaseService: FirebaseService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    /**
     * conditions for is userlogged in , is he allowed for perticular route
     */
    return Observable.create((observer: any) => {
      if (sessionStorage.getItem('email') && sessionStorage.getItem('token')) {
        this.fetchUser(sessionStorage.getItem('email')).subscribe(
          (userDetail) => {
            if (userDetail && userDetail.token === sessionStorage.getItem('token')) {
              if (
                (next.routeConfig.path === 'admin' && userDetail.role === 'admin') ||
                (next.routeConfig.path === 'user' && userDetail.role === 'user')
              ) {
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
          },
          (error) => {
            this.router.navigate(['/login']);
            sessionStorage.clear();
            observer.next(false);
            observer.complete();
          },
        );
      } else {
        this.router.navigate(['/login']);
        sessionStorage.clear();
        observer.next(false);
        observer.complete();
      }
    });
  }
  /**
   * method to fetch the user based on the email id provided
   * @param email -->email of the loged in user
   */
  public fetchUser(email: string): Observable<any> {
    return Observable.create((observer: any) => {
      this.firebaseService.getSingleUser(email).subscribe(
        (data) => {
          observer.next(data[0]);
          observer.complete();
        },
        (error) => {
          observer.next(false);
          observer.complete();
        },
      );
    });
  }
}
