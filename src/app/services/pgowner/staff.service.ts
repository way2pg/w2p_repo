import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import {Subject} from 'rxjs/Subject';
import {Constants} from "../../config/apiconstants";
import {StaffModel} from "../../models/pgowner/staff";
import {CommonService} from "../common/common.service";
var _ = require('lodash');

@Injectable()
export class StaffService {

  service:any;
  private SERVICE_API = "/api/staffmembers";

  constructor(private _common:CommonService) {
    this.service = _common.service(this.SERVICE_API);

  }


  find(query:any) {
    return this.service.find(query);
  }

  get(id:string) {
    return this._common.socket().authenticate().then(response => {
      if (_.hasIn(response, "accessToken")) {
        return this.service.get(id);
      }
    })
  }

  create(object:any) {
    return this._common.socket().authenticate().then(response => {
      if (_.hasIn(response, "accessToken")) {
        return this.service.create(object);
      }
    })
  }

  remove(id:string, query:any) {
    return this._common.socket().authenticate().then(response => {
      if (_.hasIn(response, "accessToken")) {
        return this.service.remove(id, query);
      }
    })
  }

  patch(id:string, object:any) {
    return this._common.socket().authenticate().then(response => {
      if (_.hasIn(response, "accessToken")) {
        return this.service.patch(id, object);
      }
    })
  }


}
