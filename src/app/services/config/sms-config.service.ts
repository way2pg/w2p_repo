import {Injectable} from '@angular/core';
import {CommonService} from "../common/common.service";

var _ = require('lodash');

@Injectable()
export class SMSConfigService {
  service:any;
  private SERVICE_API = "/api/sms";

  constructor(private _common:CommonService) {
    this.service = _common.service(this.SERVICE_API);

  }


  find(query:any) {
    return this._common.socket().authenticate().then(response => {
      if (_.hasIn(response, "accessToken")) {
        return this.service.find(query);
      }
    })
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
