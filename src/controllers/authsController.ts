import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const authConfig = require('../config/auth')
import User from '../models/Users'


export default {
    async store(req: Request, res: Response) {
        const { email, passwd } = req.body;

        const user: any = await (await User.findOne({ email }));

        if (!user) {
            return res.status(400).send({ error: 'E-mail não encontrado!' })
        }

        if (!await bcrypt.compare(passwd, user.psswd))
            return res.status(400).send({ error: 'Senha Inválida!' })

        user.psswd = undefined;

        const token = jwt.sign({
            id: user.id
        }, authConfig.secret, {
            expiresIn: "365d",
        })


        res.send({ user, token })
    }
}
