import { Guid } from 'guid-typescript';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IBalance } from './../../model/user.model';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import * as emailjs from 'emailjs-com';
import { UserModel } from '../../model/user.model';
import { FirebaseService } from '../../services/firebase.service';
import { ValidationService } from '../../services/validation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public newUser: UserModel;
  public pass: string;
  public toRegister = true;
  public loginErrorCode: string;
  public emailAlreadyExistsErrorCode: string;
  private isLoggedIn = false;

  /**
   * properties patterns
   */
  private unamePattern = '^[a-z0-9_-]{8,15}$';
  private emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  private pwdPattern = '^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$';
  private mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';

  /**
   *   VALIDATION ERROR MESSAGES
   */
  public account_validation_messages = this.validService.account_validation_messages;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private validService: ValidationService,
    private router: Router,
    private fbService: FirebaseService,
    private currentRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
  ) {}
  private currentUser: UserModel;
  signupForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.pwdPattern)]],
    confirmPassword: ['', [Validators.required, this.mismatchPassword.bind(this)]],
    // confirmPassword: ['', [Validators.required, this.validService.mismatch(this.signupForm.get('password'))]],
    phone: ['', [Validators.required, Validators.pattern(this.mobnumPattern)]],
  });

  ngOnInit() {
    this.signupForm.get('password').valueChanges.subscribe((value) => {
      this.pass = value;
    });
  }

  /**
   * method to create & store registered user
   */
  public createNewuser(data) {
    const balance = { forRedeem: 100, forSending: 100 } as IBalance;
    this.newUser = {
      balance: balance,
      password: data.user.uid,
      refId: Guid.create().toString(),
      role: 'user',
      userId: Guid.create().toString(),
      userName: data.user.email,
      token: data.user.uid,
    };
    /**
     * Add registered user in db
     */
    this.fbService.createUser(this.newUser);
    sessionStorage.setItem('token', this.newUser.token);
    sessionStorage.setItem('email', this.newUser.userName);
    this.router.navigate(['/login']);
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
  public onRegister() {
    this.toRegister = !this.toRegister;
    this.signupForm.reset();
  }
  /**
   * Method to either Register or Sign in
   */
  public onSubmit() {
    if (this.toRegister) {
      this.onSubmitRegister();
    } else {
      this.onSubmitLogin();
    }
  }
  /**
   * Method to register the user with username & password
   */
  public onSubmitRegister() {
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
    this.signupForm.reset();
  }

  /**
   * Method to sign in with username & password
   */
  public onSubmitLogin() {
    this.spinner.show();
    this.loginService
      .loginWithEmailAndPassword(this.signupForm.value)
      .then((data) => {
        // this.loginService.getLoggedInName.emit(data.user.email);
        this.loginService.getLoggedInName.next(data.user.email);
        this.fetchUser(data.user.email).subscribe((userDetail) => {
          if (userDetail && userDetail.key) {
            userDetail.token = data.user.uid.toString();
            sessionStorage.setItem('token', userDetail.token);
            sessionStorage.setItem('email', userDetail.userName);
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

  public CheckCon() {
    const templateParams = {
      name: 'Testing123',
      to_name: 'Raghavendra',
    };
    emailjs.send('yoyo', 'template_5bhTnqFg', templateParams, 'user_LqyB0x9nwHbehnc2Fp7G1').then(
      function(response) {
        console.log('SUCCESS!', response.status, response.text);
      },
      function(err) {
        console.log('FAILED...', err);
      },
    );
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
}
