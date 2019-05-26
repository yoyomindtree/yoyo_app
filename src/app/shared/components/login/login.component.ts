import { HistoryModel } from './../../model/history.model';
import { Guid } from 'guid-typescript';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IBalance } from './../../model/user.model';
import { LoginService } from './../../services/login.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { UserModel } from '../../model/user.model';
import { FirebaseService } from '../../services/firebase.service';
import { ValidationService } from '../../services/validation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public newUser: UserModel;
  public pass: string;
  public toRegister = true;
  public loginErrorCode: string;
  public emailAlreadyExistsErrorCode: string;
  private isLoggedIn = false;
  private phoneNumber: number;

  /**
   * properties patterns
   */
  private unamePattern = '^[a-z0-9_-]{8,15}$';
  private emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  private pwdPattern = '^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$';
  private mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  private subscription: Subscription;
  /**
   *   VALIDATION ERROR MESSAGES
   */
  public account_validation_messages = this.validService.account_validation_messages;
  private currentUser: UserModel;
  // gets or sets the signup farm.
  public signupForm: FormGroup;
  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private validService: ValidationService,
    private router: Router,
    private fbService: FirebaseService,
    private currentRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
  ) {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.pwdPattern)]],
      confirmPassword: ['', [this.mismatchPassword.bind(this)]],
      // confirmPassword: ['', [Validators.required, this.validService.mismatch(this.signupForm.get('password'))]],
      phone: ['', [Validators.required, Validators.pattern(this.mobnumPattern)]],
    });
  }
  ngOnInit() {
    this.signupForm.get('password').valueChanges.subscribe((value) => {
      this.pass = value;
    });
    this.signupForm.get('phone').valueChanges.subscribe((value) => {
      this.phoneNumber = value;
    });
  }

  /**
   * method to get the total point recieved by new user
   * @param email : new users email address
   */
  private getRecievedPoints(email: string): Observable<number> {
    return Observable.create((observer: any) => {
      this.subscription = this.fbService.getHistoryForReciever(email).subscribe((data: HistoryModel[]) => {
        let count = 0;
        for (let i = 0; i < data.length; i++) {
          count = count + data[i].totalPoints;
        }
        observer.next(count);
        observer.complete();
      },
        (error) => {
          observer.next(0);
          observer.complete();
        });
    });
  }

  /**
   * method to create & store registered user
   */
  public createNewuser(data: any): void {
    let balance: IBalance;
    this.getRecievedPoints(data.user.email).subscribe((points) => {
      balance = { forRedeem: points, forSending: 1000 };
      this.newUser = new UserModel(
        Guid.create().toString(),
        data.user.email,
        this.signupForm.get('password').value ? this.signupForm.get('password').value : data.user.uid,
        'user',
        Guid.create().toString(),
        balance,
        data.user.uid ? data.user.uid : Guid.create().toString(),
        data.user.displayName ? data.user.displayName : this.signupForm.get('username').value,
        this.signupForm.get('phone').value ? this.signupForm.get('phone').value : 0,
      );
      this.fbService.createUser(this.newUser);
      sessionStorage.setItem('token', this.newUser.token);
      sessionStorage.setItem('email', this.newUser.userName);
      sessionStorage.setItem('displayName', this.newUser.displyName);
      this.signupForm.reset();
      this.router.navigate(['/login']);
    }, (error) => {
      balance = { forRedeem: 0, forSending: 1000 };
      this.newUser = new UserModel(
        Guid.create().toString(),
        data.user.email,
        this.signupForm.get('password').value ? this.signupForm.get('password').value : data.user.uid,
        'user',
        Guid.create().toString(),
        balance,
        data.user.uid ? data.user.uid : Guid.create().toString(),
        data.user.displayName ? data.user.displayName : this.signupForm.get('username').value,
        this.signupForm.get('phone').value ? this.signupForm.get('phone').value : 0,
      );
      this.fbService.createUser(this.newUser);
      sessionStorage.setItem('token', this.newUser.token);
      sessionStorage.setItem('email', this.newUser.userName);
      sessionStorage.setItem('displayName', this.newUser.displyName);
      this.signupForm.reset();
      this.router.navigate(['/login']);
    });
    /**
     * Add registered user in db
     */

  }

  /**
   * method to sign in with Google
   */
  public onLoginWithGoogle(): void {
    this.loginService
      .loginInWithGoogle()
      .then((data) => {
        this.loginService.getLoggedInName.next(data.user.email);
        this.fetchUser(data.user.email).subscribe(
          (userDetail) => {
            if (userDetail && userDetail.key) {
              userDetail.token = data.user.uid.toString();
              sessionStorage.setItem('token', userDetail.token);
              sessionStorage.setItem('email', userDetail.userName);
              sessionStorage.setItem('displayName', userDetail.displyName);
              this.fbService.updateUser(userDetail.key, userDetail);
              this.router.navigate(['/user']);
            } else {
              this.createNewuser(data);
            }
          },
          (error) => {
            this.createNewuser(data);
          },
        );
      })
      .catch((error) => {
        console.log('Registeration Error : ', error);
        this.emailAlreadyExistsErrorCode = error.code;
      });
  }

  /**
   * Method to toggle between sign in and register
   */
  public onRegister(): void {
    this.toRegister = !this.toRegister;
    this.signupForm.reset();
  }
  /**
   * Method to either Register or Sign in
   */
  public onSubmit(): void {
    if (this.toRegister) {
      this.onSubmitRegister();
    } else {
      this.onSubmitLogin();
    }
  }
  /**
   * Method to register the user with username & password
   */
  public onSubmitRegister(): void {
    this.loginService
      .registerWithEmailAndPassword(this.signupForm.value)
      .then((data) => {
        this.createNewuser(data);
        this.onRegister();
      })
      .catch((error) => {
        console.log('Registeration Error : ', error);
        this.emailAlreadyExistsErrorCode = error.code;
      });
  }

  /**
   * Method to sign in with username & password
   */
  public onSubmitLogin(): void {
    this.spinner.show();
    this.loginService
      .loginWithEmailAndPassword(this.signupForm.value)
      .then((data) => {
        this.loginService.getLoggedInName.next(data.user.email);
        this.fetchUser(data.user.email).subscribe((userDetail) => {
          if (userDetail && userDetail.key) {
            userDetail.token = data.user.uid.toString();
            sessionStorage.setItem('token', userDetail.token);
            sessionStorage.setItem('email', userDetail.userName);
            sessionStorage.setItem('displayName', userDetail.displayName);
            this.fbService.updateUser(userDetail.key, userDetail);
            if (userDetail.role === 'admin') {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/user']);
            }
          }
          this.spinner.hide();
          this.signupForm.reset();
        });
      })
      .catch((error) => {
        console.log('Login Error: ', error);
        this.loginErrorCode = error.code;
        this.spinner.hide();
      });
  }
  /**
   * method to fetch the user based on the email id
   * @param email --> user email id
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
   * Custom validator function to validate the passwords
   */
  public mismatchPassword(control: FormControl): { [s: string]: boolean } {
    if (this.pass !== '' && this.pass !== control.value) {
      return { areEqual: true };
    }
    return null;
  }

  ngOnDestroy(): void {
    // unsubscription.
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
