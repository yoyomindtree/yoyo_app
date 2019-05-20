import {
  NgForm,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { IBalance } from './../../model/user.model';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import * as emailjs from 'emailjs-com';
import { UserModel } from '../../model/user.model';
import { FirebaseService } from '../../services/firebase.servce';
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  /**
   *   VALIDATION ERROR MESSAGES
   */
  private account_validation_messages = {
    'username': [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
      // { type: 'validUsername', message: 'Your username has already been taken.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required.' },
      // { type: 'areEqual', message: 'Password mismatch' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],
    'phone': [
      { type: 'required', message: 'Your contact number is required.' },
      { type: 'pattern', message: 'Your number should contain only digits.'}
    ]
  };

  private unamePattern = '^[a-z0-9_-]{8,15}$';
  private emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  private pwdPattern = '^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$';
  private mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService
  ) { }

  signupForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25), Validators.pattern(this.unamePattern)]],
    email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
    // password: ['', [Validators.required, Validators.pattern(this.pwdPattern)]],
    // confirmPassword: ['', [Validators.required, Validators.pattern(this.pwdPattern)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.pwdPattern)]],
    confirmPassword: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern(this.mobnumPattern)]]
  });

  ngOnInit() { }

  onLoginWithGoogle() {
    this.loginService.LoginInWithGoogle().then(data => console.log(data));
  }

  onRegister() {
    this.loginService.registerWithEmailAndPassword(this.signupForm.value)
      .then((data) => {
        console.log('response : ', data);
      })
      .catch(error => {
        console.log('Error : ', error);
      });
  }
  CheckCon() {
    var templateParams = {
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
  AddUser() {
    let balence = { forRedeem: 10, forSending: 20 } as IBalance;
    let userModel = new UserModel('yoyomindtree@gmail.com', 'yoyo', '12345', 'user', '1', balence);
    this.firebaseService.createUser(userModel);
  }
}
