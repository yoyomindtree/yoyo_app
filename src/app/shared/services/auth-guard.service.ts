import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  canActivate() {
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['/user-dashboard']);
    }
    return !this.loginService.isLoggedIn();
  }
}
