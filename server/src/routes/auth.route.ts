import express from 'express';
import jwt from 'jsonwebtoken';
import { createErrCodeJSON } from '../tools/lib';
import UserQuery from '../controllers/user.controller';
import config from '../config/global.config';
import { authValid } from '../middleware/user.middleware';

const authRouter: express.Router = express.Router();
const errorCode = createErrCodeJSON('AUTH');

authRouter.post('/login/v1', async (req, res) => {
  if (!req.body) {
    res.status(401).json(errorCode('LOGIN', 0));
    return;
  }
  const { email, password, cookie } = req.body;

  if (cookie) {
    await UserQuery.authCookie(cookie).then((data) => {
      if (data) {
        const token = jwt.sign({
          user_id: data,
        }, config.security.salt, {
          expiresIn: config.security.loginDuration,
        });
        res.json({ code: 200, token });
      } else {
        res.status(401).json({ code: 400, desc_code: 'invalid-token' });
      }
    });
    return;
  }

  if (!email || email.length === 0) {
    res.status(401).json(errorCode('LOGIN', 1));
    return;
  }
  if (!password || password.length === 0) {
    res.status(401).json(errorCode('LOGIN', 2));
    return;
  }

  UserQuery.auth(email, password).then((re) => {
    const result: any = re;
    if (result.code === 200) {
      result.token = jwt.sign({
        user_id: result.data.user_id,
      }, config.security.salt, {
        expiresIn: config.security.loginDuration,
      });
      res.json(result);
    } else {
      // log(result);
      res.status(401).json(result);
    }
  });
});

authRouter.get('/steam/realm', (req, res) => {
  res.json(config.gStoreURL);
});

authRouter.post('/logout', ((req, res) => {
  res.json({ code: 200 });
}));

authRouter.get('/user', authValid, (req, res) => {
  const payload = res.locals.user;
  const { user_id } = payload;
  if (!user_id) {
    res.json(errorCode('USER', 1));
    return;
  }

  UserQuery.getByUserID(user_id).then((user) => {
    if (user) {
      res.json({ code: 200, user });
    } else {
      res.json(errorCode('USER', 2));
    }
  });
});

export default authRouter;
