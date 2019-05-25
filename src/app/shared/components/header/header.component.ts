import { Observable } from 'rxjs';
import { FirebaseService } from './../../services/firebase.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { map } from 'rxjs/operators';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  // gets or sets the loggedin property
  public isLoggedIn = false;
  // gets or sets the loggedin user name
  public loggedInUsername: string;
  constructor(
    private fbService: FirebaseService,
    private loginService: LoginService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.loginService.getLoggedInName.subscribe((email) => {
      if (email) {
        this.isLoggedIn = true;
        this.loggedInUsername = email;
      }
    });
  }
  // method will get called once user clicked on logout
  public onLogoutClicked(): void {
    this.fetchUser(sessionStorage.getItem('email')).subscribe(
      (userDetail) => {
        if (userDetail && userDetail.key) {
          userDetail.token = null;
          this.fbService.updateUser(userDetail.key, userDetail);
          sessionStorage.clear();
        } else {
          sessionStorage.clear();
        }
      },
      (error) => {
        sessionStorage.clear();
      },
    );
    this.isLoggedIn = false;
    this.loginService.logOut();
  }
  onLogoClciked() {}

  /**
   * method to fetch the user based on the email
   * @param email --> eamil id of the user.
   */
  public fetchUser(email: string): Observable<any> {
    return Observable.create((observer: any) => {
      this.fbService.getSingleUser(email).subscribe(
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

  /**
   * method will get called once user clcik on the edit profile.
   */
  public openEditDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '470px';
    dialogConfig.width = '600px';

    const dialogRef = this.dialog.open(EditUserDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      // console.log("result from dialog : ", result);
    });
  }
}
