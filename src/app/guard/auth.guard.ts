import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../services/user.service';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private _user: UserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const helper = new JwtHelperService();
    if (!helper.isTokenExpired(this._user.getToken())) {
      return true;
    } else {
      this.router.navigate(['login'], {queryParams: {redirectTo: state.url}});
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const helper = new JwtHelperService();
    if (!helper.isTokenExpired(this._user.getToken())) {
      return true;
    } else {
      this.router.navigate(['login'], {queryParams: {redirectTo: state.url}});
      return false;
    }
  }
}
