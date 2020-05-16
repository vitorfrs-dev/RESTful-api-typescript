import bcrypt from 'bcryptjs';
import User from '../models/User';

interface UserData {
  name: string;
  email: string;
  password: string;
}

async function createUser(userData: UserData): Promise<any> {
  const { name, email, password } = userData;

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw Error('User already exists');
  }

  const passwordHash = await bcrypt.hash(password, 8);

  const user = await User.create({
    email,
    name,
    password: passwordHash,
  });

  return user;
}

export default createUser;
