import {Injectable} from '@angular/core';
import {CommonService} from "../common/common.service";
import {RequestModel} from "../../models/requests/request";


var _ = require('lodash');
var moment = require('moment');
@Injectable()
export class ServiceRequest {

  service:any;
  private SERVICE_API = "/api/requests";

  constructor(private $common:CommonService) {
    this.service = $common.service(this.SERVICE_API);

  }


  find(query:any) {
    return this.service.find(query);
  }

  get(id:string) {
    return this.service.get(id);
  }

  create(object:any) {
    return this.service.create(object);
  }

  remove(id:string, query:any) {
    return this.service.remove(id, query);
  }

  patch(id:string, object:any) {
    return this.$common.socket().authenticate().then(response => {
      if (_.hasIn(response, "accessToken")) {
        return this.service.patch(id, object);
      }
    })

  }

}
