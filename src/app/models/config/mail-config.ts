export class MailConfig {

  _id:string = null;
  name:string = null;
  isEnabled:boolean = false;
  host:string = null;
  port:string = null;
  secure:boolean = false;
  auth:Auth = new Auth();

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

class Auth {
  user:string=null;
  pass:string = null;
}
