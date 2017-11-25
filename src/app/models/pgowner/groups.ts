import {User} from "../profile";

export class GroupModel{
  _id:string;
  name:string='';
  members:User[]=[];

  createdAt:Date;
  createdBy:{};
  updatedBy:{};
  updatedAt:Date;

  constructor(values : Object ={}){
    Object.assign(this,values)
  }
}





