import { Request, Response, NextFunction } from 'express';
import { createErrCodeJSON, HttpStatusCode } from '../tools/lib';

const errorCode = createErrCodeJSON();

export const checkBodyEmpty = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
        return res.status(200).json(errorCode(HttpStatusCode.BAD_REQUEST, 'BODY', 'REQUIRED'));
    } else {
        next();
    }
};

export const checkParamsEmpty = (req: Request, res: Response, next: NextFunction) => {
    if (!req.query) {
        return res.status(200).json(errorCode(HttpStatusCode.BAD_REQUEST, 'PARAMS', 'REQUIRED'));
    } else {
        next();
    }
};
