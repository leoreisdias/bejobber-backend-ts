"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
mongoose_1.default.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose_1.default.set('useCreateIndex', true);
app.use(cors_1.default());
app.use(express_1.default.json());
app.use('/files', express_1.default.static(path_1.default.resolve(__dirname, '..', 'uploads')));
app.use(routes_1.default);
app.listen(process.env.PORT || 3333);
