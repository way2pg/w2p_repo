import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {PGDetails} from "../../models/pgowner/pgdetails";
import 'rxjs/add/observable/of';
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import {Subject} from 'rxjs/Subject';
import {Constants} from "../../config/apiconstants";
var shortid = require('shortid');

const _ = require('lodash');
import {Room} from "../../models/pgowner/room";
import {SocketService, RestService} from "../feathersjs/feathers.service";
import {CommonService} from "../common/common.service";


@Injectable()
export class PGOwnerService {
  pgdetails:PGDetails;
  room:Room;

  private service:any;
  private SERVICE_API = "/api/pgdetails";
  public notify;

  constructor(private $common:CommonService) {
    this.service = $common.service(this.SERVICE_API);
    this.notify = $common.notify()
  }


  find(query:any) {
    return this.$common.socket().authenticate().then(response => {
      if (_.hasIn(response, "accessToken")) {
        return this.service.find(query);
      }
    })
  }
  search(query:any) {
    return this.service.find(query);
  }

  get(id:string) {
    return this.service.get(id);
  }

  create(user:any) {
    return this.$common.socket().authenticate().then(response => {
      if (_.hasIn(response, "accessToken")) {
        return this.service.create(user);
      }
    })
  }

  remove(id:string, query:any) {
    return this.$common.socket().authenticate().then(response => {
      if (_.hasIn(response, "accessToken")) {
        return this.service.remove(id, query);
      }
    })

  }

  update(id:string, query:any) {
    return this.$common.socket().authenticate().then(response => {
      if (_.hasIn(response, "accessToken")) {
        return this.service.update(id, query);
      }
    })

  }

  patch(id:string, query:any) {
    return this.$common.socket().authenticate().then(response => {
      if (_.hasIn(response, "accessToken")) {
        return this.service.patch(id, query);
      }
    })
  }


// PG Details
  save(pgDetails:PGDetails) {
    if (!_.isNull(pgDetails._id)) {
      return this.patch(pgDetails._id, pgDetails);
    } else {
      return this.create(pgDetails);
    }
  }

// Save Rooms.
  saveRoom(room:Room, id:string) {
    this.room = room;
    if (!_.isNull(room.roomid)) {
      return this.get(id).then(response => {
        if (!_.isNull(response)) {
          this.pgdetails = response;
          _.remove(this.pgdetails.rooms, function (object) {
            return object.roomid = room.roomid;
          })
          this.pgdetails.rooms.push(this.room);
          return this.update(this.pgdetails._id, this.pgdetails);
        }
      });
    } else {
      return this.get(id).then(response => {
        this.pgdetails = response;
        this.room.roomid = shortid.generate();
        this.pgdetails.rooms.push(this.room);
        return this.update(this.pgdetails._id, this.pgdetails);
      });
    }
  }

  private handleError(error:any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  $service(){
    return this.service;
  }
}
