import { Request, Response } from 'express'

import User from '../models/Users'
import parseStringAsArray from '../utils/parseStringAsArray'

export default {
    async index(req: Request, res: Response) {
        const { latitude, longitude, services } = req.query;

        const servicesArray = parseStringAsArray(services);

        const serviceToUpperCase = servicesArray.map((service: any) => service.toUpperCase());

        const users = await User.find({
            services: {
                $in: serviceToUpperCase,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                }
            }
        })

        return res.json({ users })
    }
}