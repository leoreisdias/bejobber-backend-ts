import { Router } from 'express'
import multer from 'multer'
import uploadConfig from './config/upload'
import authMiddleware from './middleware/auth'
import authController from './controllers/authController'

import UsersController from './controllers/UsersController'
import SearchController from './controllers/SearchController'
import profilesController from './controllers/profilesController'

const routes = Router();
const upload = multer(uploadConfig);


routes.get('/users', UsersController.index);
routes.post('/users', upload.array('images'), UsersController.store);

routes.get('/search', SearchController.index);
routes.get('/profile', profilesController.index);

routes.post('/authenticate', authController.store);


routes.use(authMiddleware);

export default routes;