import {User} from "../profile";
import {PGDetails} from "./pgdetails";
export class TenantModel {
  _id:string = null;
  tenantImg:string = "";
  referredBy:string = "";
  referralCode:string = "";
  idproofs = [];
  joinedPackage:string = "";
  roomtype:string = "";
  advanceAmount:number = null;
  paidAmount:number = null;
  joinedDate:string = "";
  pgowner:User;
  tenant:User = new User({});
  uploadedImages = [];
  pgdetails:PGDetails;

  createdAt:Date;
  createdBy:User;
  updatedBy:User;
  updatedAt:Date;

  deleted:boolean;
  deletedBy:User;
  deletedAt:Date;

  constructor(values:Object = {}) {
    Object.assign(this, values)
  }
}

