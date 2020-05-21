import bcrypt from 'bcryptjs';
import ForgotPassword from '../models/ForgotPassword';
import User from '../models/User';

async function redefinePassResetToken(
  resetToken: string,
  newPass: string,
  confirmNewPass: string,
): Promise<void> {
  if (newPass !== confirmNewPass) {
    throw new Error("Password and Confirm Password doesen't match");
  }

  const forgot = await ForgotPassword.findOne({
    resetToken,
    expiresIn: { $gte: new Date() },
  });

  if (!forgot) {
    throw new Error('resetToken not found');
  }

  const user = await User.findById(forgot.userId);

  if (!user) {
    throw new Error('User not found');
  }

  const passwordHash = await bcrypt.hash(newPass, 10);

  user.password = passwordHash;

  await user.save();
}

export default redefinePassResetToken;
