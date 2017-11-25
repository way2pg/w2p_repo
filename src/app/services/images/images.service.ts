import {Injectable} from '@angular/core';
import {Headers, Http, Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {FoodModel} from "../../models/pgowner/food";
import 'rxjs/add/observable/of';
import 'rxjs/Rx';
import {Constants} from "../../config/apiconstants";
import {environment} from "../../../environments/environment.prod";
import {CommonService} from "../common/common.service";
var _ = require('lodash');


@Injectable()
export class ImagesService {
  api:any = environment.api;
  private IMAGE_API_URL:string = this.api + "/api/image/delete";

  constructor(private http:Http, private $common:CommonService) {

  }

  delete(id):Promise<any> {
    let options:RequestOptions = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});
    let url = `${this.IMAGE_API_URL}/${id}`;

    return this.http
      .delete(url, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error:any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
