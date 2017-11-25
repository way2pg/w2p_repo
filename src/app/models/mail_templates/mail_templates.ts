export class MailTemplate {
  _id:string = null;
  name:string = null;
  subject:string = null;
  from:string = null;
  template:string = null;
  isEnabled:string=null;
  cc:string=null;
  bcc:string=null;

  createdAt:Date;
  updatedAt:Date;
  deletedAt:Date;

  isDeleted:Boolean;
  deletedBy:{};
  createdBy:{};
  updatedBy:{};


  constructor(values:Object = {}) {
    Object.assign(this, values);
  }
}
