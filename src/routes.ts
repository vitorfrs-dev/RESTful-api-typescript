import { Router } from 'express';
import UserController from './controllers/UserController';

const routes = Router();

routes.post('/user', UserController.create);
routes.get('/user', UserController.index);
routes.get('/user/:id', UserController.show);
routes.put('/user/:id', UserController.update);

export default routes;
