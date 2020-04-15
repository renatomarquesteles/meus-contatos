import { Router } from 'express';
import multer from 'multer';

import ContactController from './app/controllers/ContactController';
import FileController from './app/controllers/FileController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/contacts', ContactController.index);
routes.post('/contacts', ContactController.store);
routes.put('/contacts/:id', ContactController.update);
routes.delete('/contacts/:id', ContactController.delete);

routes.get('/contact/:id', ContactController.show);

export default routes;
