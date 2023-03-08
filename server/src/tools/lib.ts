import path from 'path';
import nodemailer, { SentMessageInfo } from 'nodemailer';
import config from '../config/global.config';

export const createErrCode = (parent: string) => (name: string, code: number | string) => `${parent.toUpperCase()}-${name.toUpperCase()}-${code.toString().toUpperCase()}`;

export const createErrCodeJSON = (parent: string, defaultCode = 400) => (name: string, no: number | string) => ({ code: defaultCode, err_code: `${parent.toUpperCase()}-${name.toUpperCase()}-${no.toString().toUpperCase()}` });

export const getRootDir = () => path.dirname(path.dirname(__dirname));
