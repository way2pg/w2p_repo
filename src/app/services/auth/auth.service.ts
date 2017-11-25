import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {User} from "../../models/profile";
import {UserService} from "../user/user.service";

var _ = require('underscore');

@Injectable()
export class AuthService {
  private USER_LOGIN_URL:string = "api/auth/login";
  private USER_REGISTER_URL:string = "api/auth/register";
  private USER_RESET_URL:string = "api/auth/reset";
  private USER_UPDATE_URL:string = "api/auth/update";
  private IS_TOKEN_EXPIRES_URL:string = "api/auth/isTokenExpires";

  constructor(private http:Http,
              private userService:UserService) {
  }

  login(user:User) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http
      .post(this.USER_LOGIN_URL, JSON.stringify(user), {headers: headers}).map(response => {
        let body = response.json();
        //this.userService.setUser(body.data, body.token);
        return body.message;
      })
      .toPromise()
      .then(response => response)
      .catch(this.handleError)
      .then(errors => errors);
  }

  register(user:User) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http
      .post(this.USER_REGISTER_URL, JSON.stringify(user), {headers: headers})
      .map(response => {
        return response.json();
      })
      .toPromise()
      .catch(this.handleError);
  }

  resetPassword(email:{}) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http
      .post(this.USER_RESET_URL, JSON.stringify(email), {headers: headers})
      .map(response => {
        return response.json();
      })
      .toPromise()
      .catch(this.handleError);
  }

  updatePassword(object:any) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http
      .post(this.USER_UPDATE_URL, JSON.stringify(object), {headers: headers})
      .map(response => {
        return response.json();
      })
      .toPromise()
      .catch(this.handleError);
  }

  isTokenExpires(object:any) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http
      .post(this.IS_TOKEN_EXPIRES_URL, JSON.stringify(object), {headers: headers})
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

  logout() {
    localStorage.clear();
  }

  isLoggedIn() {
    return localStorage.getItem('accessToken') !== null;
  }

}
