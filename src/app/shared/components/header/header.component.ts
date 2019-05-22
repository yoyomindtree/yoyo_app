import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private loginService: LoginService) {}


  constructor(private loginservice:LoginService) { }

  ngOnInit() {
  }
  onLogoutClicked(){
this.loginservice.logOut();
  }
}
  ngOnInit() {}
  /**
   * method will get called if user clicked on logout
   */
  onSignOutClicked() {
    this.loginService.LogOut();
  }
}