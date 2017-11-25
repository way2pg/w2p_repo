export class RulesModel{
  _id:any;
  rule:string='';
  createdAt:Date;
  createdBy:{};
  updatedBy:{};
  updatedAt:Date;

  constructor(values:Object={}){
    Object.assign(this,values);
  }
}
