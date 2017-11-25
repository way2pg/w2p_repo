export class SMSTemplate {
  _id:string = null;
  name:string = null;
  template:string = null;
  isEnabled:string=null;

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
