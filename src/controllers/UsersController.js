"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const User = require('../models/Users');
//const parseStringAsArray = require('../utils/parseStringAsArray');
const axios = require('axios');
const geocodeRequest_1 = __importDefault(require("../utils/geocodeRequest"));
exports.default = {
    async store(req, res) {
        const { name, cpf, phone, bio, email, services, psswd, address, houseNumber, city, state } = req.body;
        const requestImages = req.files;
        const images = requestImages.map((image) => {
            return { path: image.location };
        });
        let fullAddress = await geocodeRequest_1.default(houseNumber + ' ' + address + ' ' + city + ' ' + state);
        const location = {
            type: 'Point',
            coordinates: [fullAddress.lng, fullAddress.lat],
        };
        const servicesArray = services.split(',').map((service) => service.trim());
        const servicesToUpperCase = servicesArray.map((service) => service.toUpperCase());
        let user_cpf = await User.findOne({ cpf });
        let user_email = await User.findOne({ email });
        let user;
        if (!user_cpf && !user_email) {
            const data = {
                name,
                cpf,
                phone,
                bio,
                images,
                email,
                services: servicesToUpperCase,
                psswd,
                address,
                houseNumber,
                city,
                state,
                location
            };
            // const schema = Yup.object().shape({
            //     name: Yup.string().required('Nome Obrigatório!'),
            //     cpf: Yup.string().required('CPF Obrigatório!').max(11),
            //     phone: Yup.string().required('Telefone Obrigatório!').max(12),
            //     bio: Yup.string().required('Descrição Obrigatória').max(300),
            //     email: Yup.string().required('E-mail Obrigatório!').email(),
            //     services: Yup.array().of(Yup.string()).required('Serviços Obrigatorios!'),
            //     psswd: Yup.string().required('Senha Obrigatoria!'),
            //     address: Yup.string().required('Endereço Obrigatorio').min(5),
            //     houseNumber: Yup.number().required('Numero do Endereço Obrigatorio!'),
            //     city: Yup.string().required('Cidade Obrigatoria!'),
            //     state: Yup.string().required('Estado Obrigatorio!'),
            //     images: Yup.array(
            //         Yup.object().shape({
            //             path: Yup.string().required(),
            //         })
            //     )
            // })
            // await schema.validate(data, {
            //     abortEarly: false,
            // })
            user = await User.create(data);
        }
        else {
            return res.status(400).json({ error: "CPF ou Email já cadastrado" });
        }
        user.psswd = undefined;
        return res.json(user);
    },
    async index(req, res) {
        const users = await User.find();
        return res.json(users);
    },
    async update() {
    },
    async destroy() {
    }
};
