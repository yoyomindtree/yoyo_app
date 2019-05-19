import { FirebaseService } from './../../services/firebase.servce';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import * as emailjs from 'emailjs-com';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService, private firebaseService: FirebaseService) {}

  ngOnInit() {}
  onLoginWithGoogle() {
    this.loginService.LoginInWithGoogle().then((data) => console.log(data));
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
}
