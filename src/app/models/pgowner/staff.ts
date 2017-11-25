import {User} from "../profile";
export class StaffModel {
  _id:string=null;
  pgowner:{};
  staffmember:User=new User({});
  staffrole:string;
  permissions:Permissions=new Permissions({});
  pgdetails:{};

  createdAt:Date;
  createdBy:{};
  updatedBy:{};
  updatedAt:Date;
  
  deleted:boolean;
  deletedBy:{}
  deletedAt:Date;
  
  
  
  constructor(values : Object ={}){
    Object.assign(this,values)
  }
}

export class Permissions{
  roomManagement:boolean=false;
  tenantManagement:boolean=false;
  manageCommunications:boolean=false;
  rules:boolean=false;
  alerts:boolean=false;
  locality:boolean=false;
  manageRequests:boolean=false;
  refundPolicy:boolean=false;
  foodManagement:boolean=false;

  constructor(values : Object ={}){
    Object.assign(this,values)
  }

}


