import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/global.config';
import { log } from 'console';

export const authValid = (req: Request, res: Response, next: NextFunction) => {
    try {
        const Token = req.headers.authorization;
        if (Token === null) {
            return res.status(403).json({ code: 403, desc: 'unauthorized' });
        }

        if (Token !== 'undefined') {
            const Admin = jwt.verify(Token!, config.security.salt);
            req.body.credentials = Admin;
            log("this is admin middleware credentials",req.body.credentials)
            next();
        }
    } catch (error) {
        res.status(403).json({ code: 403, desc: 'unknow error' });
    }

};

export const checkBodyEmpty = (errMessage: any) => (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
        res.json(errMessage);
    } else {
        next();
    }
};

