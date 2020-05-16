import { Request, Response } from 'express';
import createUser from '../services/createUser';
import User from '../models/User';

class UserController {
  static async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      const user = await createUser({ name, email, password });

      return res.json(user);
    } catch (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
  }

  static async index(req: Request, res: Response) {
    try {
      const users = await User.find();

      return res.json(users);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      return res.json(user);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }
}

export default UserController;
