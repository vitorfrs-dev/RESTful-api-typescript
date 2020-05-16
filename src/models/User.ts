import { Schema, model, Document } from 'mongoose';

const User = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

interface UserInterface extends Document {
  name: string;
  email: string;
  password: string;
}

export default model<UserInterface>('User', User);
