export class Comments {
  _id = null;

  pgid:{};
  user:{};
  comment:{}

  createdAt:Date;
  createdBy:{};
  updatedBy:{};
  updatedAt:Date;

  constructor(values:Object = {}) {
    Object.assign(this, values);
  }
}
