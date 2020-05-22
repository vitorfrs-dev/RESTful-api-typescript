import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User';

import jwtConfig from '../config/jwtConfig';

interface UserI {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

async function authenticateUser(
  email: string,
  password: string,
): Promise<UserI> {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Incorrect email or password');
  }

  const isCorrect = await bcrypt.compare(password, user.password);

  if (!isCorrect) {
    throw new Error('Incorrect email or password');
  }

  const token = jwt.sign(
    {
      userId: user._id,
    },
    jwtConfig.secret,
    {
      expiresIn: jwtConfig.expiresIn,
    },
  );

  return {
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
    },
    token,
  };
}

export default authenticateUser;
