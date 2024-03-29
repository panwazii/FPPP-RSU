import express from 'express';
import jwt from 'jsonwebtoken';
import { createErrCodeJSON, createUnknownErrCodeJSON, HttpStatusCode } from '../tools/lib';
import UserController from '../controllers/user.controller';
import AdminController from '../controllers/admin.controller';
import CartController from '../controllers/cart.controller';
import config from '../config/global.config';
import { log } from '../tools/log';

const authRouter: express.Router = express.Router();

const errorCode = createErrCodeJSON();
const unknownErrorCode = createUnknownErrCodeJSON()

authRouter.post('/admin/login', async (req, res) => {
  try {
    if (!req.body) {
      res.status(200).json(errorCode(HttpStatusCode.UNAUTHORIZED, 'BODY', 'EMPTY'));
      return;
    }
    const { email, password } = req.body;
    const AuthHeader = req.headers.authorization;

    if (AuthHeader) {
      await AdminController.authCookie(AuthHeader).then((data) => {
        if (data) {
          const Token = jwt.sign({
            id: data.user?.id
          }, config.security.salt, {
            expiresIn: config.security.loginDuration,
          });
          res.json({ code: 200, user: data.user, token: Token, admin: true });
        } else {
          res.status(401).json({ code: 400, desc_code: 'invalid-token' });
        }
      });
      return;
    }

    if (!email || email.length === 0) {
      res.status(200).json(errorCode(HttpStatusCode.UNAUTHORIZED, 'EMAIL', 'EMPTY'));
      return;
    }
    if (!password || password.length === 0) {
      res.status(200).json(errorCode(HttpStatusCode.UNAUTHORIZED, 'PASSWORD', 'EMPTY'));
      return;
    }

    AdminController.auth(email, password).then((user) => {
      log(user);
      let Result: any = user;

      if (Result.code === 200) {
        Result.token = jwt.sign({
          id: Result.user.id,
          admin: true,
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
    interface JwtPayload {
      [key: string]: any;
      verify: boolean
    }
    const Decode = AdminController.verifyJWT(Token as string) as JwtPayload
    const AdminId = Decode.result.id
    const Data = await AdminController.getByID(AdminId)
    if (Data!.type === "SUPERADMIN") {
      return res.status(200).json({ type: "super-admin" });
    }
    else if (Data!.type === "ADMIN") {
      return res.status(200).json({ type: "admin" });
    }

  } catch (error) {
    res.status(401).json(error);
  }
});

authRouter.post('/user/register', async (req, res) => {
  try {
    const Check = await UserController.getByEmail(req.body.email)
    if (Check) {
      return res.status(200).json({ code: 1, msg: "this email is not available" })
    }

    const User = await UserController.register(req.body)

    if (User) {
      await CartController.create(User.id)
      return res.status(201).json({ code: 201 });
    }
    else {
      return res.status(401).json({ code: 401 });
    }

  } catch (error) {
    res.status(401).json({ code: 2, msg: `"unknown error : "${error}` });
  }
});

authRouter.post('/user/login', async (req, res) => {
  try {
    if (!req.body) {
      res.status(401).json(errorCode(HttpStatusCode.UNAUTHORIZED, 'BODY', 'EMPTY'));
      return;
    }
    const { email, password } = req.body;
    const AuthHeader = req.headers.authorization;

    if (AuthHeader) {
      await UserController.authCookie(AuthHeader).then((data) => {
        if (data) {
          const Token = jwt.sign({
            id: data.user?.id
          }, config.security.salt, {
            expiresIn: config.security.loginDuration,
          });
          res.json({ code: 200, user: data.user, token: Token, admin: false });
        } else {
          res.status(401).json({ code: 400, desc_code: 'invalid-token' });
        }
      });
      return;
    }

    if (!email || email.length === 0) {
      res.status(200).json(errorCode(HttpStatusCode.UNAUTHORIZED, 'EMAIL', 'EMPTY'));
      return;
    }
    if (!password || password.length === 0) {
      res.status(200).json(errorCode(HttpStatusCode.UNAUTHORIZED, 'PASSWORD', 'EMPTY'));
      return;
    }

    UserController.auth(email, password).then((user) => {
      log(user);
      let Result: any = user;

      if (Result.code === 200) {
        Result.token = jwt.sign({
          id: Result.user.id,
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

authRouter.get('/user/verify', async (req, res) => {
  try {
    const Token = req.query.token;

    if (Token === null) {
      res.status(403).json({ code: 403, desc: 'unauthorized' });
    }
    interface JwtPayload {
      [key: string]: any;
      verify: boolean
    }
    const Decode = UserController.verifyJWT(Token as string) as JwtPayload
    const UserId = Decode.result.id
    const Data = await UserController.getByID(UserId)
    return res.status(200).json({ verify: true });


  } catch (error) {
    return res.status(401).json(error);
  }
});

export default authRouter;
