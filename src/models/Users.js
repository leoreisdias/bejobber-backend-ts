"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const PointSchema_1 = __importDefault(require("./PointSchema"));
const ImagesSchema_1 = __importDefault(require("./ImagesSchema"));
const UserSchema = new mongoose_1.default.Schema({
    name: String,
    cpf: String,
    phone: String,
    bio: String,
    images: [ImagesSchema_1.default],
    email: String,
    services: [String],
    psswd: String,
    address: String,
    houseNumber: String,
    city: String,
    state: String,
    location: {
        type: PointSchema_1.default,
        index: '2dsphere'
    },
    score: Number,
    totalScore: Number
});
UserSchema.pre('save', async function (next) {
    const hash = await bcryptjs_1.default.hash(this.psswd, 10);
    this.psswd = hash;
    next();
});
module.exports = mongoose_1.default.model('User', UserSchema);
