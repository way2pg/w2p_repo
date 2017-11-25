export class Country {
  _id:null;
  code:string;
  name:string;
  dial_code:string;
  currency_name:string;
  currency_symbol:string;
  currency_code:string;

  createdBy:{};
  createdAt:{};

  updatedBy:{};
  updatedAt:{};
  deletedBy:{};
  deletedAt:{};
  isDeleted:{};

  constructor(values:Object = {}) {
    Object.assign(this, values);
  }
}
