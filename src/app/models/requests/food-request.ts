import {User} from "../profile";
export class FoodRequestModel {
  _id:string = null;
  tenant:User;
  comments:string = null;
  start_date:Date;
  end_date:Date;
  dinner:Boolean = false;
  lunch:Boolean = false;
  breakfast:Boolean = false;
  status:string;
  pgowner:{};

  createdAt:Date;
  updatedAt:Date;
  deletedAt:Date;
  isDeleted:Boolean;
  createdBy:{};
  updatedBy:{};
  deletedBy:{};

  constructor(values:Object = {}) {
    Object.assign(this, values);
  }
}
