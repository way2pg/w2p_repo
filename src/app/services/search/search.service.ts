import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {User} from "../../models/profile";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import {Subject} from 'rxjs/Subject';
import {RequestModel} from "../../models/requests/request";
import {SocketService, RestService} from "../feathersjs/feathers.service";
import {NotifyService} from "../notify.service";


@Injectable()
export class SearchService {
  
  public search_data=null;

  constructor(private http:Http,
              private notify:NotifyService,
              private _socket:SocketService,
              private _rest:RestService) {



  }

  getUser():User {
    return JSON.parse(localStorage.getItem("user"));
  }

}
