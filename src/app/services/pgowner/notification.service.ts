import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import { Subject } from 'rxjs/Subject';
import {GroupModel} from "../../models/pgowner/groups";
import {Constants} from "../../config/apiconstants";
import {MailModel} from "../../models/mail";
var _ =require('underscore');

@Injectable()
export class NotificationService {
  private GROUP_URL:string = "api/pgowner/group";
  private MAIL_URL:string = "api/mail/send";
  constants:Constants;


  constructor(private http:Http,constants:Constants) {
      this.constants=constants;
  }

  private mail:Subject<any> = new Subject<any>();
  private sms:Subject<any> = new Subject<any>();
  private type:Subject<any> = new Subject<any>();



  setMail(mail:any):void {
    this.mail.next(mail);
  }

  getMail():Observable<any> {
    return this.mail.asObservable();
  }

  setSMS(sms:any):void {
    this.sms.next(sms);
  }

  getSMS():Observable<any> {
    return this.sms.asObservable();
  }

  setType(type:any):void {
    this.type.next(type);
  }

  gettype():Observable<any> {
    return this.type.asObservable();
  }

  private handleError(error:any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }


  createGroup(group:GroupModel) {
    if (group._id) {
      return this.putCreateGroup(group);
    } else {
      return this.postCreateGroup(group);
    }

  }

  private putCreateGroup(group:GroupModel):Promise<any> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http
      .put(`${this.GROUP_URL}/${group._id}`+this.constants.getToken(), JSON.stringify(group), {headers: headers})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private postCreateGroup(group:GroupModel):Promise<any> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http
      .post(this.GROUP_URL+this.constants.getToken(), JSON.stringify(group), {headers: headers})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getGrops():Promise<GroupModel[]> {
    debugger;
    return this.http.get(this.GROUP_URL)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getGroup(id:string) {
    return this.http.get(this.GROUP_URL + '/' + id)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  //Delete Group
 /* deleteGroup(group:GroupModel) {
    debugger;
    var _id = group._id;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = null;//`${this.STAFF_PROFILE_URL}/${_id}`;

    return this.http
      .delete(url, headers)
      .toPromise()
      .catch(this.handleError);
  }*/


  public sendMail(mail:MailModel):Promise<any> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http
      .post(this.MAIL_URL+this.constants.getToken(), JSON.stringify(mail), {headers: headers})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

}
