import express from 'express';
import { createErrCodeJSON } from '../tools/lib';
import log from '../tools/log';
import AdminController from '../controllers/admin.controller';
import UserController from '../controllers/user.controller';
import { authValid } from '../middleware/admin.middleware';

const adminRouter: express.Router = express.Router();
const errorCode = createErrCodeJSON('ADMIN');

adminRouter.get('/getAdminInfo', authValid, async (req, res) => {
    try {
        const AdminId = req.body.credentials.id;

        AdminController.getByUserID(AdminId).then((user) => {
            if (user) {
                res.status(200).json({
                    code: 200, admin: {
                        id: user.id,
                        type_id: user.type_id,
                        fname: user.fname,
                        lname: user.lname,
                        email: user.email,
                        tel: user.tel,
                        avatar: user.avatar,
                        status: user.status,
                        created_at: user.created_at,
                        update_at: user.update_at
                    }
                });
            } else {
                res.json(errorCode('ADMIN', 0));
            }
        });
    } catch (error) {
        res.status(401).json(error);
    }
});



adminRouter.post('/update', authValid, (req, res) => {
    if (!req.body) {
        res.json(errorCode('update', 0));
        return;
    }

    const { user_id, data } = req.body;
    if (!user_id || Number.isNaN(Number(user_id)) || !data) {
        res.json(errorCode('update', 1));
        return;
    }

    UserController.update(Number(user_id), data).then((state) => {
        if (state) {
            res.json({ code: 200, state });
        } else {
            res.json(errorCode('UPDATE', 2));
        }
    });
});

adminRouter.post('/update/password', authValid, (req, res) => {
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

// adminRouter.post('/destroy', authValid, adminOnly, (req, res) => {
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

export default adminRouter;




