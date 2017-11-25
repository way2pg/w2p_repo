export class LikeDislikes{
  _id:any;
  pgid:{};
  user:{};
  like:boolean;
  dislike:boolean;
  
  createdAt:Date;
  createdBy:{};
  updatedBy:{};
  updatedAt:Date;

  constructor(values:Object={}){
    Object.assign(this,values);
  }
}
