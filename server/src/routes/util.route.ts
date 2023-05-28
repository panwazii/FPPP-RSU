import multer from 'multer';
import express from 'express';
import path from 'path';
import { Storage } from '@google-cloud/storage';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { createErrCodeJSON } from '../tools/lib';
// import { corsAllow } from '../middleware/user.middleware';
import config from '../config/global.config';
import log from '../tools/log';

const utilRouter: express.Router = express.Router();
const multerUpload = multer();
const errorCode = createErrCodeJSON('UTIL');
const rootDIR = path.dirname(path.dirname(__dirname));

const storage = new Storage({
    projectId: config.firebase.projectId,
    keyFilename: "../config/firebase_storage_key.json",
});
const { bucketName } = config.google;
const bucket = storage.bucket(bucketName);

utilRouter.post('/upload/image', multerUpload.single('image'), async (req, res) => {
    if (!req.file) {
        res.sendStatus(400).json(errorCode('UPLOAD-IMG', 1));
        return;
    }

    const file_buff = req.file.buffer;
    const parser = path.parse(req.file.originalname);
    // const file_name = parser.name;
    const file_ext = parser.ext.toLowerCase();
    const new_ext = '.webp';
    const file_new = `images/upload/${uuidv4()}${new_ext}`;

    if (file_ext === '.jpg' || file_ext === '.jpeg' || file_ext === '.png' || file_ext === '.webp') {
        let sharpData = sharp(file_buff);
        const meta = await sharpData.metadata();
        if (meta.width && meta.width > 1280) {
            sharpData = sharpData.resize({ width: 1280 });
        }
        const imageBuff = await sharpData.webp({
            lossless: true, quality: 60, alphaQuality: 80, force: false,
        }).toBuffer();

        const blob = bucket.file(file_new);
        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: req.file.mimetype,
            },
        });

        blobStream.on('error', (e) => {
            log(e);
            res.sendStatus(400).json(errorCode('UPLOAD-IMG', 2));
        });

        blobStream.on('finish', async () => {
            blob.makePublic().then(() => {
                const publicURL = `https://storage.googleapis.com/bucket/${encodeURI(file_new)}`;
                log(`Uploaded ${publicURL}`);
                res.json({ code: 200, path: publicURL });
            }).catch((e) => {
                log(e);
                res.sendStatus(400).json(errorCode('UPLOAD-IMG', 3));
            });
        });

        blobStream.end(imageBuff);
    } else {
        res.sendStatus(400).json(errorCode('UPLOAD-IMG', 4));
    }
});

// utilRouter.use('/static', corsAllow, express.static(path.join(rootDIR, 'static')));

export default utilRouter;
