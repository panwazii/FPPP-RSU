import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/global.config';
import { createErrCodeJSON, createUnknownErrCodeJSON, HttpStatusCode } from '../tools/lib';
import LogController from '../controllers/log.controller';
import { LogAttribute } from '../database/models/logs.model';
import AdminController from '../controllers/admin.controller';

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

export const requestLog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const adminInfo = await AdminController.getByID(req.body.credentials.id);
        const ip = req.ip;
        const route = req.originalUrl;
        const method = req.method;
        const params = req.query;
        const { credentials, ...body } = req.body;

        const data: LogAttribute = {
            type: adminInfo?.type,
            uuid: adminInfo?.id,
            fname: adminInfo?.fname,
            lname: adminInfo?.lname,
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