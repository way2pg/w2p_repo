/**
 * Created by Srinivasa Reddy P (psrinuhp@gmail.com).
 */
import {Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {UserService} from "../services/user/user.service";
import {User} from "../models/profile";

@Injectable()
export class Constants {
  jsonHeader:Headers;
  token:string;
  user:User;

  constructor(private userService:UserService){
    /*this.userService.getUserDetails().subscribe((user: User) => {
      if(user){
        this.user=user;
      }
    });*/
  }
  getToken() {
    return localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
  }

  getJsonHeader():Headers {
    return new Headers({'Content-Type': 'application/json'});
  }

  getuid(){
    return "&uid="+this.userService.getUser()._id;
  }

}
