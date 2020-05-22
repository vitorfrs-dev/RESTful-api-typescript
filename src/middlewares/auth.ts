import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import jwtConfig from '../config/jwtConfig';

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const headers = req.headers.authorization;

  if (!headers) {
    return res.status(400).json({ msg: 'Token not provided' });
  }

  const [, token] = headers.split(' ');

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);

    const { userId: id } = decoded as Token;

    req.user = { id };

    next();
  } catch {
    return res.status(401).json({ msg: 'Invalid token' });
  }
}

interface Token {
  userId: string;
  iat: number;
  exp: number;
}

export default authMiddleware;
