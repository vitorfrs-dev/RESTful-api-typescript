import bcrypt from 'bcryptjs';
import User from '../models/User';

interface UserData {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  avatar?: string;
}

async function updateUser(userData: UserData): Promise<any> {
  const { id, name, email, password, avatar } = userData;

  const user = await User.findById(id);

  if (!user) {
    throw new Error('User not found');
  }

  if (password) {
    const passwordHash = await bcrypt.hash(password, 10);
    user.password = passwordHash;
  }

  user.name = name || user.name;

  if (email && email !== user.email) {
    const notAvailable = await User.findOne({ email });

    if (notAvailable) {
      throw new Error('E-mail not available');
    }

    user.email = email;
  }

  if (avatar) {
    user.avatar = avatar;
  }

  await user.save();

  return user;
}

export default updateUser;
