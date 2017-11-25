export class Terms {
  _id=null;
  terms:string=null;
  createdAt:Date;
  createdBy:{};
  updatedBy:{};
  updatedAt:Date;

  constructor(values:Object = {}) {
    Object.assign(this, values);
  }
}
