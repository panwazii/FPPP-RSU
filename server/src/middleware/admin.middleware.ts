import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/global.config';
import { log } from 'console';
import { createErrCodeJSON, createUnknownErrCodeJSON, HttpStatusCode } from '../tools/lib';

const errorCode = createErrCodeJSON();
const unknownErrorCode = createUnknownErrCodeJSON()

export const authValid = (req: Request, res: Response, next: NextFunction) => {
    try {
        const Token = req.headers.authorization;
        if (Token === null) {
            return res.status(200).json(errorCode(HttpStatusCode.UNAUTHORIZED, 'TOKEN', 'NOTFOUND'));
        }

        if (Token !== 'undefined') {
            const Admin = jwt.verify(Token!, config.security.salt);
            req.body.credentials = Admin;
            next();
        }
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }

};