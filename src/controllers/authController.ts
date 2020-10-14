import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const User = require('../models/Users');
const authConfig = require('../config/auth')

export default {
    async store(req: Request, res: Response) {
        const { email, passwd } = req.body;

        const user = await (await User.findOne({ email }));

        if (!user) {
            return res.status(400).send({ error: 'E-mail não encontrado!' })
        }

        if (!await bcrypt.compare(passwd, user.passwd))
            return res.status(400).send({ error: 'Senha Inválida!' })

        user.passwd = undefined;

        const token = jwt.sign({
            id: user.id
        }, authConfig.secret, {
            expiresIn: "365d",
        })


        res.send({ user, token })
    }
}
