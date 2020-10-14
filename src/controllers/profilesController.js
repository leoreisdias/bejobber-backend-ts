"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User = require('../models/Users');
exports.default = {
    async index(req, res) {
        console.log(req.query);
        const { id } = req.query;
        const users = await User.findById(id);
        return res.json({ users });
    }
};
