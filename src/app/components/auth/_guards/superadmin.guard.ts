import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {CommonService} from "../../../services/common/common.service";

const _ = require('lodash')

@Injectable()
export class SuperAdminGuard implements CanActivate {

  constructor(private router:Router, private $common:CommonService) {

  }

  canActivate(route:ActivatedRouteSnapshot,
              state:RouterStateSnapshot) {

    if (_.isEqual(this.$common.user().role, 'superadmin')) {
      return true;
    }

    if (_.isEqual(this.router.url, '/')) {
      this.router.navigate(['/dashboard']);
    }
    this.$common.warning("You don't have access. Please contact super admin.");
    return false;
  }
}
