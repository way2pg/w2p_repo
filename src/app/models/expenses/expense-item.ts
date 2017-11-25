export class ExpenseItem {
  _id:string=null;
  expense_group:{};
  expense_item:string=null;
  operation:string=null;
  comments:string=null;
  rent:boolean;
  salary:boolean;
  pgowner:{};
  createdAt:Date;
  createdBy:{};
  updatedBy:{};
  updatedAt:Date;

  constructor(values:Object = {}) {
    Object.assign(this, values);
  }
}
