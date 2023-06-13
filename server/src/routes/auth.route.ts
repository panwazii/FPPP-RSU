import express from 'express';
import jwt from 'jsonwebtoken';
import { createErrCodeJSON } from '../tools/lib';
import UserController from '../controllers/user.controller';
import AdminController from '../controllers/admin.controller';
import config from '../config/global.config';
import { log } from '../tools/log';

const authRouter: express.Router = express.Router();
const errorCode = createErrCodeJSON('AUTH');

authRouter.post('/admin/login', async (req, res) => {
  try {
    if (!req.body) {
      res.status(401).json(errorCode('LOGIN', 0));
      return;
    }
    const { email, password } = req.body;
    const AuthHeader = req.headers.authorization;

    if (AuthHeader) {
      await AdminController.authCookie(AuthHeader).then((data) => {
        if (data) {
          const Token = jwt.sign({
            data
          }, config.security.salt, {
            expiresIn: config.security.loginDuration,
          });
          res.json({ code: 200, token: Token, admin: true });
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

    AdminController.auth(email, password).then((user) => {
      log(user);
      let Result: any = user;

      if (Result.code === 200) {
        Result.token = jwt.sign({
          id: Result.data.id,
          admin: true,
          type_id: Result.data.type_id,
          email: Result.data.email,
          fname: Result.data.fname,
          lname: Result.data.lname,
          avatar: Result.data.avatar
        }, config.security.salt, {
          expiresIn: config.security.loginDuration,
        });
        res.status(200).json(Result);
      } else {
        res.status(401).json(Result);
      }
    });
  } catch (error) {
    res.status(401).json(error);
  }
});

authRouter.get('/admin/verify', async (req, res) => {
  try {
    const Token = req.query.token;

    if (Token === null) {
      res.status(403).json({ code: 403, desc: 'unauthorized' });
    }

    jwt.verify(Token as string, config.security.salt, async (error: any, decoded: any) => {
      const AdminId = decoded.id
      const Data = await AdminController.getByUserID(AdminId)
      if (Data!.type_id === 1) {
        return res.status(200).json({ type: "super-admin" });
      }
      else if (Data!.type_id === 2) {
        return res.status(200).json({ type: "admin" });
      }
    });

  } catch (error) {
    log("verify", error)
    res.status(401).json(error);
  }
});

authRouter.post('/user/register', async (req, res) => {
  try {
    const User = await UserController.register(req.body)

    if (User) {
      return res.status(201).json({ code: 201 });
    }
    else{
      return res.status(401).json({ code: 401 });
    }

  } catch (error) {
    log(error)
    res.status(401).json(error);
  }
});

authRouter.post('/user/login', async (req, res) => {
  try {
    if (!req.body) {
      res.status(401).json(errorCode('LOGIN', 0));
      return;
    }
    const { email, password } = req.body;
    const AuthHeader = req.headers.authorization;

    if (AuthHeader) {
      await AdminController.authCookie(AuthHeader).then((data) => {
        if (data) {
          const Token = jwt.sign({
            data
          }, config.security.salt, {
            expiresIn: config.security.loginDuration,
          });
          res.json({ code: 200, token: Token, admin: true });
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

    AdminController.auth(email, password).then((user) => {
      log(user);
      let Result: any = user;

      if (Result.code === 200) {
        Result.token = jwt.sign({
          id: Result.data.id,
          admin: false,
          type_id: Result.data.type_id,
          email: Result.data.email,
          fname: Result.data.fname,
          lname: Result.data.lname,
          avatar: Result.data.avatar
        }, config.security.salt, {
          expiresIn: config.security.loginDuration,
        });
        res.status(200).json(Result);
      } else {
        res.status(401).json(Result);
      }
    });
  } catch (error) {
    res.status(401).json(error);
  }
});


export default authRouter;
