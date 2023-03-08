import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/global.config';
import UserController from '../controllers/user.controller';

export const authValid = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (auth == null) {
    if (config.sandbox) {
      res.locals.user = { user_id: 'randomUUID' };
      next();
    } else {
      res.json({ code: 403, desc: 'unauthorized' });
    }
    return;
  }

  const token = `${auth}`.split(' ')[1];
  if (token !== 'undefined') {
    jwt.verify(token, config.security.salt, (err: any, user: any) => {
      if (err) {
        res.json({ code: 403, desc: 'unauthorized' });
      } else {
        res.locals.user = user;
        next();
      }
    });
  }
};

export const needGroup = (groupName: string) => async (req: Request, res: Response, next: NextFunction) => {
  const userID = Number(res.locals?.user?.user_id);
  if (Number.isNaN(userID)) {
    res.json({
      code: 403,
      desc: 'unauthorized',
    });
    return;
  }
  const userData = await UserController.getByUserID(userID);
  if (userData?.usergroup !== groupName) {
    res.json({
      code: 403,
      desc: 'unauthorized',
    });
    return;
  }
  next();
};

export const adminOnly = needGroup('admin');

export const checkBodyEmpty = (errMessage: any) => (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) {
    res.json(errMessage);
  } else {
    next();
  }
};

export const corsAllow = (req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Cross-Origin-Embedder-Policy', '*');
  res.header('Cross-Origin-Opener-Policy', '*');
  res.header('Cross-Origin-Resource-Policy', '*');
  next();
};
