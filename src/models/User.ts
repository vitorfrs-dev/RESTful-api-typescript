import { Schema, model, Document } from 'mongoose';

const userSchema = new Schema(
  {
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
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

userSchema.virtual('avatarUrl').get(function () {
  if (!this.avatar) return null;
  return `files/${this.avatar}`;
});

interface UserInterface extends Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  avatarUrl: string;
}

export default model<UserInterface>('User', userSchema);
