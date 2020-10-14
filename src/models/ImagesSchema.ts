import mongoose from 'mongoose'

const ImagesSchema = new mongoose.Schema({
    path: String,
});

export default ImagesSchema;