export class SMSConfig {
  _id:string = null;
  url:string = null;
  isEnabled:boolean = false;
  username:string = null;
  password:string = null;

  createdAt:Date;
  updatedAt:Date;
  deletedAt:Date;
  createdBy:{};
  updatedBy:{};
  deletedBy:{};

  isDeleted:boolean;

  constructor(values:Object = {}) {
    Object.assign(this, values);
  }
}
