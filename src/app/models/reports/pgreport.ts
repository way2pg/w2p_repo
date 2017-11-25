export class PGReports{
  _id:any=null;
  pgowner: {};
  pg_id:{};
  pg_count: number=0;
  tenant_count: number=0;
  staff_count: number=0;
  pgstaff_count:number=0;
  deluxe:{};
  luxury:{};
  general:{};

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
