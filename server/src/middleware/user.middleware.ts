import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/global.config';
import { log } from 'console';
import { createErrCodeJSON, createUnknownErrCodeJSON, HttpStatusCode } from '../tools/lib';
import LogController from '../controllers/log.controller';
import { LogAttribute } from '../database/models/logs.model';
import UserController from '../controllers/user.controller';
import UserTypeController from '../controllers/user_types.controller';

const errorCode = createErrCodeJSON();
const unknownErrorCode = createUnknownErrCodeJSON()

export const authValid = (req: Request, res: Response, next: NextFunction) => {
    try {
        const Token = req.headers.authorization;
        if (Token === null) {
            return res.status(200).json(errorCode(HttpStatusCode.UNAUTHORIZED, 'TOKEN', 'NOTFOUND'));
        }

        if (Token !== 'undefined') {
            const User = jwt.verify(Token!, config.security.salt);
            req.body.credentials = User;
            next();
        }
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }

};

export const requestLog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInfo = await UserController.getByID(req.body.credentials.id);
        const userType = await UserTypeController.getByID(String(userInfo?.type_id));
        const ip = req.ip;
        const route = req.originalUrl;
        const method = req.method;
        const params = req.query;
        const { credentials, ...body } = req.body;

        const data: LogAttribute = {
            type: userType?.name,
            uuid: userInfo?.id,
            fname: userInfo?.fname,
            lname: userInfo?.lname,
            ip,
            route,
            method,
            body: body,
            params: params
        }
        await LogController.create(data)
        next();
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
};