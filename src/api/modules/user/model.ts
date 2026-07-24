import mongoose, { Schema, SchemaTypeOptions } from 'mongoose';
import { UserData } from './UserData.ts';

type UserType = Required<Omit<
UserData,
'_id' | 'createdAt' | 'updatedAt'
>>;

type UserSchema = { [ K in keyof UserType ]: SchemaTypeOptions<UserData>[K] };

const schema: UserSchema = {
  email: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },

  password: {
    type: Schema.Types.String,
    required: true,
  }
};

const userSchema = new Schema<UserData>(schema, {
  timestamps: true,
  versionKey: false,
  toObject: {
    transform(doc, ret: any) {
      const obj = ret;
      obj.id = obj._id.toString();
      delete obj._id;
    },
  },
});

const UserModel = mongoose.model('users', userSchema);
export default UserModel;
