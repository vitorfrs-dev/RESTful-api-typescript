import { Router } from 'express';
import UserController from './controllers/UserController';
import ForgotController from './controllers/ForgotController';
import SessionController from './controllers/SessionController';

const routes = Router();

routes.post('/signin', SessionController.create);

routes.post('/user', UserController.create);
routes.get('/user', UserController.index);
routes.get('/user/:id', UserController.show);
routes.put('/user/:id', UserController.update);

routes.post('/forgotPassword', ForgotController.create);
routes.get('/forgotPassword/:resetToken', ForgotController.show);
routes.put('/forgotPassword', ForgotController.update);

export default routes;
