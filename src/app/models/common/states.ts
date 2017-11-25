import {Country} from "./countries";
export class State {
  _id: null;
  name: string;
  country: Country;

  createdBy: {};
  createdAt: {};

  updatedBy: {};
  updatedAt: {};
  deletedBy: {};
  deletedAt: {};
  isDeleted: {};

  constructor(values:Object = {}) {
    Object.assign(this, values);
  }
}
