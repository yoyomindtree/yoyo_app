import { Observable } from 'rxjs';
import { FirebaseService } from './../../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private fbService: FirebaseService, private loginService: LoginService) { }

  ngOnInit() { }
  onLogoutClicked() {
    this.fetchUser(sessionStorage.getItem('email')).subscribe((userDetail) => {
      if (userDetail && userDetail.key) {
        userDetail.token = null;
        this.fbService.updateUser(userDetail.key, userDetail);
        sessionStorage.clear();
      } else {
        sessionStorage.clear();
      }
    }, (error) => {
      sessionStorage.clear();
    });
    this.loginService.logOut();
  }

  public fetchUser(email: string): Observable<any> {
    return Observable.create((observer: any) => {
      this.fbService
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
