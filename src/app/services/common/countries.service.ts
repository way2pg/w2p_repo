import {Injectable} from '@angular/core';
import {CommonService} from "../common/common.service";

var _ = require('lodash');

@Injectable()
export class CountryService {
  service:any;
  private SERVICE_API = "/api/countries";

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

  upsert(object) {
    if (_.isNull(object._id)) {
      return this.create(object)
    } else {
      return this.patch(object._id, object)
    }
  }
}
