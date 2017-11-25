import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
const _ = require('lodash')

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router:Router) {

  }

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot) {
    console.log(this.router.url)
    if (localStorage.getItem('accessToken') || _.startsWith(this.router.url, '/reports')) {
     /* if (_.isEqual(this.router.url, '/')) {
        this.router.navigate(['/dashboard']);
      }*/
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/auth/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
