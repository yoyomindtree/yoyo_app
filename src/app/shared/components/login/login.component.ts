import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IBalance } from './../../model/user.model';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import * as emailjs from 'emailjs-com';
import { UserModel } from '../../model/user.model';
import { FirebaseService } from '../../services/firebase.service';
import { ValidationService } from '../../services/validation.service';
import { Router,  ActivatedRoute } from '@angular/router';

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
    private currentRoute: ActivatedRoute
  ) { }
  private currentUser: UserModel;
  signupForm = this.formBuilder.group({
    username: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(25), Validators.pattern(this.unamePattern)],
    ],
    email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.pwdPattern)]],
    confirmPassword: ['', [Validators.required, this.mismatchPassword.bind(this)]],
    // confirmPassword: ['', [Validators.required, this.validService.mismatch(this.signupForm.get('password'))]],
    phone: ['', [Validators.required, Validators.pattern(this.mobnumPattern)]],
  });

  ngOnInit() {
    this.signupForm.get('password').valueChanges.subscribe(value => {
      this.pass = value;
    });
  }

  /**
  * method to create & store registered user
  */
  public createNewuser(data) {
    const balance = { forRedeem: 10, forSending: 20 } as IBalance;
    this.newUser = {
      balance: balance,
      password: data.user.uid,
      refId: '001',
      role: {admin: false, user: true},
      userId: '001',
      userName: data.user.email
    };
    /**
     * Add registered user in db
     */
    this.fbService.createUser(this.newUser);
  }

  /**
   * method to sign in with Google
   */
  public onLoginWithGoogle() {
    this.loginService.loginInWithGoogle()
      .then((data) => {
        this.createNewuser(data);
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
    this.loginService.registerWithEmailAndPassword(this.signupForm.value)
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
    this.loginService.loginWithEmailAndPassword(this.signupForm.value)
      .then((data) => {
        console.log('logged in response : ', data);
        this.fbService.getSingleUser(data.user.email).subscribe(value => {
          const user: UserModel = Object.values(value)[0] as UserModel;
          this.loginService.setUSer(user);
          sessionStorage.setItem('userName', user.userName);
          if (user.role.admin) {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/user']);
          }
          this.signupForm.reset();
        });

        /**
         * fetching single user
         */
      })
      .catch((error) => {
        console.log('Login Error: ', error);
        this.loginErrorCode = error.code;
      });
  }

  public getUserData(userName) {
    this.loginService.getUserByUserName(userName).subscribe(data => {
      this.currentUser = Object.values(data)[0];
    });
  }

  CheckCon() {
    const templateParams = {
      name: 'Testing123',
      to_name: 'Raghavendra',
    };
    emailjs.send('yoyo', 'template_5bhTnqFg', templateParams, 'user_LqyB0x9nwHbehnc2Fp7G1').then(
      function (response) {
        console.log('SUCCESS!', response.status, response.text);
      },
      function (err) {
        console.log('FAILED...', err);
      },
    );
  }

  /**
  * Custom validator function to validate the passwords
  */
  mismatchPassword(control: FormControl): { [s: string]: boolean } {
    if (this.pass !== '' && this.pass !== control.value) {
      return { 'areEqual': true };
    }
    return null;
  }
}
