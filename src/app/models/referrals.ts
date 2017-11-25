export class Referrals{
  _id:string;
  name : string='';
  mobile:string='';
  email:string='';
  referral_code:string='';
  status:string='';
  createdAt:Date;
  createdBy:{};
  updatedBy:{};
  updatedAt:Date;

  constructor(values:Object={}){
    Object.assign(this,values);
  }
}

