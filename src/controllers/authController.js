"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User = require('../models/Users');
const authConfig = require('../config/auth');
exports.default = {
    async store(req, res) {
        const { email, passwd } = req.body;
        const user = await (await User.findOne({ email }));
        if (!user) {
            return res.status(400).send({ error: 'E-mail não encontrado!' });
        }
        if (!await bcryptjs_1.default.compare(passwd, user.passwd))
            return res.status(400).send({ error: 'Senha Inválida!' });
        user.passwd = undefined;
        const token = jsonwebtoken_1.default.sign({
            id: user.id
        }, authConfig.secret, {
            expiresIn: "365d",
        });
        res.send({ user, token });
    }
};
