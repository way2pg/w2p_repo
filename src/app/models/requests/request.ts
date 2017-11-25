import {User} from "../profile";
const moment = require("moment");
export class RequestModel {
  _id:string;
  request_number:number;
  comments = [];
  request:string;
  type:string;
  number:number = null;


  status:string;
  owner:User;
  owner_comments:string = '';
  tenant:User;

  createdAt:Date;
  updatedAt:Date;
  createdBy:User;
  updatedBy:User;

  constructor(values:Object = {}) {
    Object.assign(this, values);
  }
}

