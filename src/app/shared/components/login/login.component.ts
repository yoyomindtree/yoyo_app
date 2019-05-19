import { FirebaseService } from './../../services/firebase.servce';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';

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
  CheckCon() {}
}
