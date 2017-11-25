export class Reports{
  _id:any=null;
  admin_count: number = 0;
  super_admin_count: number =0;
  user_count: number=0;
  pgowner_count: number=0;
  tenant_count: number=0;
  pgstaff_count:number=0;
  
  createdBy:{};
  updatedBy:{};
  deletedBy:{};

  createdAt:Date;
  updatedAt:Date;
  deleteAt:Date;
  isDeleted:boolean;

  constructor(values:Object={}){
    Object.assign(this,values);
  }
}
