import express from 'express';
import { createErrCodeJSON } from '../tools/lib';
import log from '../tools/log';
import UserQuery from '../controllers/user.controller';
import { adminOnly, authValid } from '../middleware/user.middleware';

const userRouter: express.Router = express.Router();
const errorCode = createErrCodeJSON('USER');

userRouter.get('/test', async (req, res) => {
    try {
        res.json({ code: 200 });
        log('Successful');
    } catch (e) {
        log(e);
        res.json(errorCode('RES', 3));
    }
});


userRouter.post('/register', async (req, res) => {
    if (!req.body) {
        res.json(errorCode('RES', 1));
        return;
    }

    try {
        const {
            email,
            username,
        } = req.body;
        const hasMail = await UserQuery.getByEmail(email);
        if (hasMail) {
            res.json({
                code: 400,
                err_message: 'Email are already in used.',
            });
            return;
        }

        const hasUser = await UserQuery.getByUsername(username);
        if (hasUser) {
            res.json({
                code: 400,
                err_message: 'Username are already in used.',
            });
        }

        UserQuery.register(req.body).then((state) => {
            res.json({ code: 200, state });
        });
        log('Successful');
    } catch (e) {
        log(e);
        res.json(errorCode('RES', 3));
    }
});

userRouter.get('/get', (req, res) => {
    const { user_id, steam64, discordID } = req.query;

    try {
        if (!Number.isNaN(Number(user_id))) {
            UserQuery.getByUserID(Number(user_id))
                .then((data) => {
                    const temp: any = data;
                    if (temp) {
                        temp.password = null;
                    }
                    res.json({
                        code: 200,
                        data: temp,
                    });
                });
            return;
        }

        UserQuery.getUserByQuery(req.query)
            .then((data) => {
                let temp: any[] = data.rows;
                if (data.count > 0) {
                    temp = temp.map((e) => {
                        e.password = null;
                        return e;
                    });
                }
                res.json({
                    code: 200,
                    data: {
                        rows: temp,
                        count: data.count,
                    },
                });
            })
            .catch(() => {
                res.json(errorCode('GET', 2));
            });
    } catch (e) {
        res.json(errorCode('GET', 3));
    }
});

userRouter.post('/update', authValid, (req, res) => {
    if (!req.body) {
        res.json(errorCode('update', 0));
        return;
    }

    const { user_id, data } = req.body;
    if (!user_id || Number.isNaN(Number(user_id)) || !data) {
        res.json(errorCode('update', 1));
        return;
    }

    UserQuery.update(Number(user_id), data).then((state) => {
        if (state) {
            res.json({ code: 200, state });
        } else {
            res.json(errorCode('UPDATE', 2));
        }
    });
});

userRouter.post('/update/password', authValid, (req, res) => {
    if (!req.body) {
        res.json(errorCode('pass', 0));
        return;
    }
    const { user_id, old_pass, new_pass } = req.body;
    if (!user_id || !old_pass || !new_pass) {
        res.json(errorCode('pass', 1));
        return;
    }

    UserQuery.resetPassword(Number(user_id), old_pass, new_pass).then((state) => {
        if (state) {
            res.json({ code: 200, state });
        } else {
            res.json(errorCode('pass', 2));
        }
    });
});

userRouter.post('/destroy', authValid, adminOnly, (req, res) => {
    if (!req.body) {
        res.json(errorCode('destroy', 0));
        return;
    }

    const { user_id } = req.body;
    if (!user_id || Number.isNaN(Number(user_id))) {
        res.json(errorCode('destroy', 1));
    }

    UserQuery.safeDestroyUser(Number(user_id)).then((state) => {
        if (state) {
            res.json({ code: 200, state });
        } else {
            res.json(errorCode('destroy', 2));
        }
    });
});

export default userRouter;
