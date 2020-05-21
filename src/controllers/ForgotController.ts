import { Request, Response } from 'express';
import forgotPassword from '../services/forgotPassword';

import ForgotPassword from '../models/ForgotPassword';
import Mailer from '../utils/Mailer';

class ForgotPasswordRequest {
  static async create(req: Request, res: Response) {
    const { email } = req.body;

    const forgot = await forgotPassword(email);

    if (!forgot) return res.sendStatus(500);

    const { forgot: forgotObject, user } = forgot;

    const mailer = new Mailer();

    await mailer.sendMail({
      to: `${user.name} <${user.email}>`,
      subject: 'Reset de senha',
      text: `Reset de senha, ${forgotObject.resetToken}`,
      template: 'resetPassword',
    });

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
