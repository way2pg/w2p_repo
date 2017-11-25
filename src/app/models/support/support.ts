import {User} from "../profile";

export class SupportModel {
  _id:string;
  name:string;
  email:string;
  mobile:string;
  location:string;

  support_number:number;
  comments:string;

  admins = [];
  superadmins = [];
  status:string;


  createdAt:Date;
  updatedAt:Date;
  createdBy:User;
  updatedBy:User;

  constructor(values:Object = {}) {
    Object.assign(this, values);
  }
}
