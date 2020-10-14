require('dotenv').config();

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import routes from './routes'
import path from 'path'

const app = express();

mongoose.connect(process.env.MONGO_URL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true);

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

app.listen(process.env.PORT || 3333);