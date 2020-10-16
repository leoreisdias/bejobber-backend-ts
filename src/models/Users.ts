import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

import PointSchema from './PointSchema'
import ImagesSchema from './ImagesSchema';

export interface IUser extends mongoose.Document {
    name: string;
    cpf: string;
    phone: string;
    bio: string;
    images: [string];
    email: string,
    services: [string],
    psswd: any,
    address: string,
    houseNumber: string,
    city: string,
    state: string,
    location: {
        type: typeof PointSchema,
        index: string
    },
    working_hours: string,
    work_on_weekends: boolean,
    score: number,
    totalScore: number
}

const UserSchema = new mongoose.Schema({
    name: String,
    cpf: String,
    phone: String,
    bio: String,
    images: [ImagesSchema],
    email: String,
    services: [String],
    psswd: String,
    address: String,
    houseNumber: String,
    city: String,
    state: String,
    location: {
        type: PointSchema,
        index: '2dsphere'
    },
    working_hours: String,
    work_on_weekends: Boolean,
    score: Number,
    totalScore: Number
});


UserSchema.pre<IUser>('save', async function (next) {
    const hash = await bcrypt.hash(this.psswd, 10);
    this.psswd = hash;

    next();
})

export default mongoose.model('User', UserSchema);