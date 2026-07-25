import { Types } from 'mongoose';

class Base<T = Types.ObjectId> {
  public _id?: T | string;

  public createdAt?: Date;

  public updatedAt?: Date;
}

export default Base;
