import mongoose, { Schema } from 'mongoose';


export const USER_ROLE_MEMBER = 'member';
export const USER_ROLE_ADMIN = 'admin';

const UserSchema = new Schema({
  email: {
    type: String,
  },
  password_hash: {
    type: String,
  },
  roles: {
    type: [ String ],
    default: [],
  },
});

const User = mongoose.model('user', UserSchema);
export default User;
