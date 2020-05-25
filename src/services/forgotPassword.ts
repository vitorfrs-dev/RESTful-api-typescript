import crypto from 'crypto';
import Mailer from '../utils/Mailer';

import User from '../models/User';
import ForgotPassword from '../models/ForgotPassword';

async function forgotPassword(email: string): Promise<void> {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('User not found');
  }

  const resetToken = crypto.randomBytes(16).toString('hex');

  await ForgotPassword.create({
    userId: user._id,
    resetToken,
    expiresIn: Date.now() + 3600 * 1000 * 1,
  });

  const mailer = new Mailer();

  const link = `https://localhost:3000/forgotPassword/${resetToken}`;

  try {
    await mailer.sendMail({
      to: `${user.name} <${user.email}>`,
      subject: 'Reset de senha',
      text: `Reset de senha, ${resetToken}`,
      template: 'resetPassword',
      context: {
        name: user.name,
        link,
      },
    });
  } catch (err) {
    throw new Error('Unable to send the password reset email');
  }
}

export default forgotPassword;
