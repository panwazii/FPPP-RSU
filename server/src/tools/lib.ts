import path from 'path';
import nodemailer, { SentMessageInfo } from 'nodemailer';
import config from '../config/global.config';

export enum HttpStatusCode {
    OK = 200,
    CREATED = 201,
    UPDATED = 201,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    UNAUTHORIZED = 403,
    INTERNAL_SERVER_ERROR = 500,
}

export const createErrCode = (parent: string) => (name: string, code: number | string) => `${parent.toUpperCase()}-${name.toUpperCase()}-${code.toString().toUpperCase()}`;

export const createErrCodeJSON = () => (code: number | string, parent: string, name: string) => ({ code: code, err_code: `${parent.toUpperCase()}-${name.toUpperCase()}` });

export const createUnknownErrCodeJSON = () => (code: number | string, description: string) => ({ code, description });

export const getRootDir = () => path.dirname(path.dirname(__dirname));
