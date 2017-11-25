export class Expense{
  _id:string=null;

  expense_group:{};
  expense_item:{};
  comments:string=null;
  amount:Number=null;
  rent:boolean;
  salary:boolean;
  user:{};
  pgowner:{};

  date:Date;

  createdAt:Date;
  createdBy:{};
  updatedBy:{};
  updatedAt:Date;

  constructor(values:Object = {}) {
    Object.assign(this, values);
  }
}
