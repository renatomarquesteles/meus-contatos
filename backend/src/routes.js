import { Router } from 'express';
import multer from 'multer';

import ContactController from './app/controllers/ContactController';
import FileController from './app/controllers/FileController';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/contacts', ContactController.index);
routes.post('/contacts', ContactController.store);
routes.put('/contacts/:id', ContactController.update);
routes.delete('/contacts/:id', ContactController.delete);

export default routes;
