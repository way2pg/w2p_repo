import {User} from "../profile";
export class Agenda {
  name:String;
  interval:String;
  priority:Number;
  timezone:String;
  service_url:String;
  repeat_every = true;
  data:{}
  user:User;

  createdBy:{};
  createdAt:{};

  updatedBy:{};
  updatedAt:{};
  deletedBy:{};
  deletedAt:{};
  isDeleted:{};

  constructor(values:Object = {}) {
    Object.assign(this, values);
  }
}

