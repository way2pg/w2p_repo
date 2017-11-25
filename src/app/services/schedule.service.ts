import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map'
import {Schedule} from "../models/schedule/schedule";
import {Constants} from "../config/apiconstants";
var _ = require('underscore');

@Injectable()
export class ScheduleService {
  private MAIL_SCHEDULE_URL:string = "api/schedule/mail";
  constants:Constants;

  constructor(private http:Http,
              constants:Constants) {
    this.constants=constants;
  }


  schedule(schedule:Schedule) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http
      .post(this.MAIL_SCHEDULE_URL+ this.constants.getToken(), JSON.stringify(schedule), {headers: headers})
      .map(response => {
        return response.json();
      })
      .toPromise()
      .catch(this.handleError);
  }




  private handleError(error:any) {
    console.error('An error occurred', error);

    return Promise.reject(error.message || error);
  }

}
