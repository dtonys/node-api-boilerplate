import mongoose, { Schema } from 'mongoose';


export const SESSION_DURATION_SECONDS = 60 * 60 * 24;
export const SESSION_COOKIE_NAME = 'Session';
const SessionSchema = new Schema({
  _id: String,
  createdAt: {
    type: Date,
    expires: SESSION_DURATION_SECONDS,
    default: Date.now,
  },
});

const Session  = mongoose.model('session', SessionSchema);

export default Session;
