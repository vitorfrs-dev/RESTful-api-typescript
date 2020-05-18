import { Request, Response } from 'express';
import forgotPassword from '../services/forgotPassword';

import ForgotPassword from '../models/ForgotPassword';

class ForgotPasswordRequest {
  static async create(req: Request, res: Response) {
    const { email } = req.body;

    await forgotPassword(email);

    return res.sendStatus(200);
  }

  static async show(req: Request, res: Response) {
    const { resetToken } = req.params;

    const forgot = await ForgotPassword.findOne({
      resetToken,
      expiresIn: { $gte: new Date() },
    });

    if (!forgot) {
      return res.send(401).json({ msg: 'requestToken not found' });
    }

    return res.json(forgot);
  }
}

export default ForgotPasswordRequest;
