import express from 'express';
import { createErrCodeJSON } from '../tools/lib';
import log from '../tools/log';
import UserController from '../controllers/user.controller';
import { authValid } from '../middleware/user.middleware';

const userRouter: express.Router = express.Router();
const errorCode = createErrCodeJSON('USER');

userRouter.get('/getUserInfo', authValid, async (req, res) => {
    try {
        const UserId = req.body.credentials.id;
        UserController.getByID(UserId).then((user) => {
            if (user) {
                res.status(200).json({
                    code: 200, user: {
                        id: user.id,
                        type_id: user.type_id,
                        fname: user.fname,
                        lname: user.lname,
                        email: user.email,
                        tel: user.tel,
                        avatar: user.avatar,
                        created_at: user.created_at,
                        update_at: user.update_at
                    }
                });
            } else {
                res.json(errorCode('USER', 0));
            }
        });
    } catch (error) {
        res.status(401).json(error);
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
        const hasMail = await UserController.getByEmail(email);
        if (hasMail) {
            res.json({
                code: 400,
                err_message: 'Email are already in used.',
            });
            return;
        }

        UserController.register(req.body).then((state) => {
            res.json({ code: 200, state });
        });
        log('Successful');
    } catch (e) {
        log(e);
        res.json(errorCode('RES', 3));
    }
});

// userRouter.post('/update', authValid, (req, res) => {
//     if (!req.body) {
//         res.json(errorCode('update', 0));
//         return;
//     }

//     const { user_id, data } = req.body;
//     if (!user_id || Number.isNaN(Number(user_id)) || !data) {
//         res.json(errorCode('update', 1));
//         return;
//     }

//     UserController.update(Number(user_id), data).then((state) => {
//         if (state) {
//             res.json({ code: 200, state });
//         } else {
//             res.json(errorCode('UPDATE', 2));
//         }
//     });
// });

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

    UserController.resetPassword(user_id, old_pass, new_pass).then((state) => {
        if (state) {
            res.json({ code: 200, state });
        } else {
            res.json(errorCode('pass', 2));
        }
    });
});

// userRouter.post('/destroy', authValid, adminOnly, (req, res) => {
//     if (!req.body) {
//         res.json(errorCode('destroy', 0));
//         return;
//     }

//     const { user_id } = req.body;
//     if (!user_id || Number.isNaN(Number(user_id))) {
//         res.json(errorCode('destroy', 1));
//     }

//     UserController.safeDestroyUser(Number(user_id)).then((state) => {
//         if (state) {
//             res.json({ code: 200, state });
//         } else {
//             res.json(errorCode('destroy', 2));
//         }
//     });
// });

export default userRouter;
