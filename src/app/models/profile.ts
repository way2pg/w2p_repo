import {City} from "./common/cities";
import {State} from "./common/states";
import {Country} from "./common/countries";
export class User {
  _id:string;
  firstName:string = '';
  middleName:string = '';
  lastName:string = '';
  displayName:string = '';
  dob:string = '';
  gender:string = '';
  mobile:string = '';
  email:string = '';
  password:string = '';
  maritalStatus:string = '';
  addressLineOne:string = '';
  addressLineTwo:string = '';
  city:City;
  state:State;
  country:Country;
  postalCode:string = '';
  landMark:string = '';
  comments:string = '';
  profileImg:string = "assets/images/placeholder.jpg";
  coverImg:string = "assets/images/cover_img.jpg";
  role:string;

  createdAt:Date;
  createdBy:User;
  updatedBy:User; 
  updatedAt:Date;

  deleted:boolean;
  deletedBy:User
  deletedAt:Date;

  constructor(values:Object = {}) {
    Object.assign(this, values);
  }
}

