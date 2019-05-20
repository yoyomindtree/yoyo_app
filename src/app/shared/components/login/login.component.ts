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
  private unamePattern = '^[a-z0-9_-]{8,15}$';
  private emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  private pwdPattern = '^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$';
  private mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private validService: ValidationService
  ) { }

  signupForm = this.formBuilder.group({
    username: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(25), Validators.pattern(this.unamePattern)],
    ],
    email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
    // password: ['', [Validators.required, Validators.pattern(this.pwdPattern)]],
    // confirmPassword: ['', [Validators.required, Validators.pattern(this.pwdPattern)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.pwdPattern)]],
    confirmPassword: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern(this.mobnumPattern)]],
  });

  ngOnInit() { }
  /**
   * method to sign in with Google
   */
  onLoginWithGoogle() {
    this.loginService.LoginInWithGoogle().then((data) => console.log(data));
  }

  /**
   * Method to register the user with username
   * and password
   */
  onRegister() {
    this.loginService
      .registerWithEmailAndPassword(this.signupForm.value)
      .then((data) => {
        console.log('response : ', data);
      })
      .catch((error) => {
        console.log('Error : ', error);
      });
  }
  CheckCon() {
    var templateParams = {
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
}
