import { Schema, model, Document } from 'mongoose';

export interface FPasswordInterface extends Document {
  userId: string;
  resetToken: string;
  expiresIn: Date;
}

const ForgotSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'ForgotPassword',
  },
  resetToken: String,
  expiresIn: Date,
});

export default model<FPasswordInterface>('ForgotPassword', ForgotSchema);
