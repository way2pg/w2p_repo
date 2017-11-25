export class PageViews{
  _id:any;
  pgid:{};
  view_count:Number;

  createdAt:Date;
  createdBy:{};
  updatedBy:{};
  updatedAt:Date;

  constructor(values:Object={}){
    Object.assign(this,values);
  }
}
