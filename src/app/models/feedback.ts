export class Feedback{
  _id:String;
  to:{};
  comments:String;
  ratings:{};
  createdAt:Date;
  createdBy:{};
  updatedBy:{};
  updatedAt:Date;

  constructor(values:Object={}){
    Object.assign(this,values);
  }
}

