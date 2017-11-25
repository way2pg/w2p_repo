import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {CommonService} from "../../../services/common/common.service";

const _ = require('lodash')

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router:Router, private $common:CommonService) {

  }

  canActivate(route:ActivatedRouteSnapshot,
              state:RouterStateSnapshot) {

    if (!this.$common.isLoggedIn()) {
      this.$common.warning("Please login to access page");
      this.router.navigate(['/auth/login'], {queryParams: {returnUrl: state.url}});
      return false;
    }
    if (_.isEqual(this.$common.user().role, 'superadmin')
      || _.isEqual(this.$common.user().role, 'admin')) {
      return true;
    }

    if (_.isEqual(this.router.url, '/')) {
      this.router.navigate(['/dashboard']);
    }
    this.$common.warning("You don't have access. Please contact admin.");
    return false;
  }
}
