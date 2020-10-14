require('dotenv').config();

import path from 'path'
import crypto from 'crypto'
import aws from 'aws-sdk'
import multerS3 from 'multer-s3'


const storageS3 = new aws.S3()

const storageTypes = {
    // local: multer.diskStorage({
    //     destination: (req, file, cb) => {
    //         cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
    //     },
    //     filename: (req, file, cb) => {
    //         crypto.randomBytes(16, (err, hash) => {
    //             if (err) cb(err, "Error");

    //             file.key = `${hash.toString('hex')}-${file.originalname}`;

    //             cb(null, file.key);
    //         })
    //     },
    // }),
    s3: multerS3({
        s3: new aws.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY,
            region: process.env.AWS_REGION
        }),
        bucket: 'bejobber',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);

                const fileName = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, fileName);
            });
        },

    }),
}

export default {
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    storage: storageTypes['s3'],
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (req: any, file: any, cb: any) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif',
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type.'));
        }
    }
};