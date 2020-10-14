"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const util_1 = require("util");
exports.default = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ error: "No token provided" });
    }
    const [scheme, token] = authHeader.split(" ");
    try {
        const decoded = await util_1.promisify(jsonwebtoken_1.default.verify)(token, "secret");
        // req.userId = decoded.id;
        return next();
    }
    catch (err) {
        return res.status(401).send({ error: "Token invalid" });
    }
};
