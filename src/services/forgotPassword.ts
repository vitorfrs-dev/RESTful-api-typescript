import crypto from 'crypto';

import User from '../models/User';
import ForgotPassword, { FPasswordInterface } from '../models/ForgotPassword';

async function forgotPassword(email: string): Promise<FPasswordInterface> {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('User not found');
  }

  const resetToken = crypto.randomBytes(16).toString('hex');

  const forgot = await ForgotPassword.create({
    userId: user._id,
    resetToken,
    expiresIn: Date.now() + 3600 * 1000 * 1,
  });

  return forgot;
}

export default forgotPassword;
