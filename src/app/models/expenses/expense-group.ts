export class ExpenseGroup {
  _id:string=null;
  expense_group:string=null;
  comments:string=null;
  pgdetails:{};
  
  rent:boolean;
  salary:boolean;
  
  createdAt:Date;
  createdBy:{};
  updatedBy:{};
  updatedAt:Date;

  constructor(values:Object = {}) {
    Object.assign(this, values);
  }
}
