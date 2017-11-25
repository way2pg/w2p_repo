import {State} from "./states";
export class City {


  _id:null;
  name:string;
  state:State;

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
