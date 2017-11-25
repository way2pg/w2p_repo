import {Injectable} from '@angular/core';
import {CommonService} from "../common/common.service";

var _ = require('lodash');

@Injectable()
export class FoodRequestService {
  service:any;
  private SERVICE_API = "/api/foodrequest";

  constructor(private $common:CommonService) {
    this.service = $common.service(this.SERVICE_API);

  }


  find(query:any) {
    return this.$common.socket().authenticate().then(response => {
      if (_.hasIn(response, "accessToken")) {
        return this.service.find(query);
      }
    })
  }

  get(id:string) {
    return this.$common.socket().authenticate().then(response => {
      if (_.hasIn(response, "accessToken")) {
        return this.service.get(id);
      }
    })
  }

  create(object:any) {
    return this.$common.socket().authenticate().then(response => {
      if (_.hasIn(response, "accessToken")) {
        return this.service.create(object);
      }
    })
  }

  remove(id:string) {
    return this.$common.socket().authenticate().then(response => {
      if (_.hasIn(response, "accessToken")) {
        return this.service.remove(id);
      }
    })
  }

  patch(id:string, object:any) {
    return this.$common.socket().authenticate().then(response => {
      if (_.hasIn(response, "accessToken")) {
        return this.service.patch(id, object);
      }
    })
  }
}
