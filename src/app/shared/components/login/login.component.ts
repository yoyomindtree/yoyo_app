import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IBalance } from './../../model/user.model';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import * as emailjs from 'emailjs-com';
import { UserModel } from '../../model/user.model';
import { FirebaseService } from '../../services/firebase.servce';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  /**
  *   VALIDATION ERROR MESSAGES
  */
  public account_validation_messages = this.validService.account_validation_messages;
  /**
   * properties patterns
   */
  private pass: string;
  public toRegister = true;
  private unamePattern = '^[a-z0-9_-]{8,15}$';
  private emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  private pwdPattern = '^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$';
  private mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private validService: ValidationService
  ) { }

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
   * method to sign in with Google
   */
  onLoginWithGoogle() {
    this.loginService.LoginInWithGoogle().then((data) => console.log(data));
  }

  public onSubmit() {
    if (this.toRegister) {
      this.onSubmitRegister();
    } else {
      // this.onSubmitLogin();
    }
  }
  /**
   * Method to register the user with username
   * and password
   */
  onSubmitRegister() {
    this.loginService.registerWithEmailAndPassword(this.signupForm.value)
      .then((data) => {
        console.log('response : ', data);
      })
      .catch((error) => {
        console.log('Error : ', error);
      });
    // this.onRegister();
    this.signupForm.reset();
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

  public onRegister() {
    this.toRegister = !this.toRegister;
    this.signupForm.reset();
  }

  mismatchPassword(control: FormControl): { [s: string]: boolean } {
    // return this.validService.mismatch(this.pass, control.value);
    if (this.pass !== '' && this.pass !== control.value) {
      return { 'areEqual': true };
    }
    return null;
  }
}
