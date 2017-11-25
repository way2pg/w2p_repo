import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {TenantModel} from "../../models/pgowner/tenant";
import 'rxjs/add/observable/of';
import 'rxjs/Rx';
import {CommonService} from "../common/common.service";
var _ = require('lodash');

@Injectable()
export class TenantService {

  private service:any;
  private SERVICE_API = "/api/tenants";

  constructor(private $common:CommonService) {
    this.service = $common.service(this.SERVICE_API);

  }

  find(query:any) {
    return this.service.find(query);
  }

  get(id:string) {
    return this.$common.socket().authenticate().then(response => {
      if (_.hasIn(response, "accessToken")) {
        return this.service.get(id);
      }
    })
  }

  create(user:any) {
    return this.$common.socket().authenticate().then(response => {
      if (_.hasIn(response, "accessToken")) {
        return this.service.create(user);
      }
    })
  }

  remove(id:string, query:any) {
    return this.$common.socket().authenticate().then(response => {
      if (_.hasIn(response, "accessToken")) {
        return this.service.remove(id, query);
      }
    })
  }

  patch(id:string, query:any) {
    return this.$common.socket().authenticate().then(response => {
      if (_.hasIn(response, "accessToken")) {
        return this.service.patch(id, query);
      }
    })
  }
  events(){
    return this.service
  }
}
