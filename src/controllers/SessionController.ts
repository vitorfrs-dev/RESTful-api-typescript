import { Request, Response } from 'express';
import authenticateUser from '../services/authenticateUser';

class SessionController {
  static async create(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const { user, token } = await authenticateUser(email, password);
      return res.json({ user, token });
    } catch (err) {
      return res.status(401).json({ error: err.message });
    }
  }
}

export default SessionController;
