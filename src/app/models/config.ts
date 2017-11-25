export class Config {
  _id:string=null;
  key:string=null;
  value:string=null;
  type:string=null;
  comments:string=null;
  createdAt:Date;
  createdBy:{};
  updatedBy:{};
  updatedAt:Date;

  constructor(values:Object = {}) {
    Object.assign(this, values);
  }
}
