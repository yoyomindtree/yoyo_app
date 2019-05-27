import { defaultLanguage } from './../../utils/app.i18n';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { FirebaseService } from './../../services/firebase.service';
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { map } from 'rxjs/operators';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  // gets or sets the loggedin property.
  public isLoggedIn = false;
  // gets or sets the loggedin user name.
  public loggedInUsername: string;
  // gets or sets the subscription.
  private subscription: Subscription;
  constructor(
    private fbService: FirebaseService,
    private loginService: LoginService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.translate.use(defaultLanguage);
    this.subscription = this.loginService.getLoggedInName.subscribe((email) => {
      if (email) {
        this.isLoggedIn = true;
        this.loggedInUsername = email;
      }
    });
  }
  // method will get called once user clicked on logout
  public onLogoutClicked(): void {
    this.subscription = this.fetchUser(sessionStorage.getItem('email')).subscribe(
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
  public onLogoClicked(): void {
    if (this.router.url.indexOf('/user') >= 0) {
      this.router.navigate(['/user'], { relativeTo: this.currentRoute });
    }
  }

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
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '470px';
    dialogConfig.width = '600px';

    const dialogRef = this.dialog.open(EditUserDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {});
  }
  /**
   * method will get called on click of history.
   */
  public onHistoryClicked(): void {
    this.router.navigate(['/user/history'], { relativeTo: this.currentRoute });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
