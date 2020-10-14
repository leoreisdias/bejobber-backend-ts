"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User = require('../models/Users');
const parseStringAsArray = require('../utils/parseStringAsArray');
exports.default = {
    async index(req, res) {
        console.log(req.query);
        const { latitude, longitude, services } = req.query;
        const servicesArray = parseStringAsArray(services);
        const serviceToUpperCase = servicesArray.map((service) => service.toUpperCase());
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
        });
        return res.json({ users });
    }
};
