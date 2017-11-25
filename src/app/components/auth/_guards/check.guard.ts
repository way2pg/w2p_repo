import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {CommonService} from "../../../services/common/common.service";


@Injectable()
export class CheckGuard implements CanActivate {

  constructor(private router:Router,
              private $common:CommonService) {

  }

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot) {
    if (this.$common.isLoggedIn()) {
      this.router.navigate(['/user/profile']);
      return false;
    }

    return true;
  }
}
