import { Request, Response } from 'express';
import createUser from '../services/createUser';
import User from '../models/User';
import updateUser from '../services/updateUser';

class UserController {
  static async create(req: Request, res: Response): Promise<Response> {
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

  static async index(req: Request, res: Response): Promise<Response> {
    try {
      const users = await User.find();

      return res.json(users);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async show(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.json(user);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, email, password } = req.body;

    let avatar;

    if (req.file) {
      const { filename } = req.file;
      avatar = filename;
    }

    try {
      const user = await updateUser({
        id,
        name,
        email,
        password,
        avatar,
      });

      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default UserController;
