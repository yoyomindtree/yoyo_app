import { IBalance } from './../../model/user.model';
import { FirebaseService } from './../../services/firebase.servce';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import * as emailjs from 'emailjs-com';
import { UserModel } from '../../model/user.model';
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
  AddUser() {
    let balence = { forRedeem: 10, forSending: 20 } as IBalance;
    let userModel = new UserModel('yoyomindtree@gmail.com', 'yoyo', '12345', 'user', '1', balence);
    this.firebaseService.createUser(userModel);
  }
}
