"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const upload_1 = __importDefault(require("./config/upload"));
const auth_1 = __importDefault(require("./middleware/auth"));
const authController_1 = __importDefault(require("./controllers/authController"));
const UsersController_1 = __importDefault(require("./controllers/UsersController"));
const SearchController_1 = __importDefault(require("./controllers/SearchController"));
const profilesController_1 = __importDefault(require("./controllers/profilesController"));
const routes = express_1.Router();
const upload = multer_1.default(upload_1.default);
routes.get('/users', UsersController_1.default.index);
routes.post('/users', upload.array('images'), UsersController_1.default.store);
routes.get('/search', SearchController_1.default.index);
routes.get('/profile', profilesController_1.default.index);
routes.post('/authenticate', authController_1.default.store);
routes.use(auth_1.default);
exports.default = routes;