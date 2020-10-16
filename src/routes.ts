import { Router } from 'express'
import multer from 'multer'
import uploadConfig from './config/upload'
import authMiddleware from './middleware/auth'
import authsController from './controllers/authsController'

import UsersController from './controllers/UsersController'
import SearchsController from './controllers/SearchsController'

const routes = Router();
const upload = multer(uploadConfig);


routes.get('/users', UsersController.index);
routes.post('/users', upload.array('images'), UsersController.store);
routes.get('/users/:id', UsersController.show);

routes.get('/search', SearchsController.index);

routes.post('/authenticate', authsController.store);


routes.use(authMiddleware);

export default routes;