import { Request, Response } from 'express'

const User = require('../models/Users');

export default {
    async index(req: Request, res: Response) {
        console.log(req.query);

        const { id } = req.query;
        const users = await User.findById(id);

        return res.json({ users })
    }
}