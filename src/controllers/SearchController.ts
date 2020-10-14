import { Request, Response } from 'express'

const User = require('../models/Users');
const parseStringAsArray = require('../utils/parseStringAsArray');

export default {
    async index(req: Request, res: Response) {
        console.log(req.query);

        const { latitude, longitude, services } = req.query;

        const servicesArray = parseStringAsArray(services);

        const serviceToUpperCase = servicesArray.map((service: string) => service.toUpperCase());

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