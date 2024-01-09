import express from 'express';
import { createErrCodeJSON, createUnknownErrCodeJSON, HttpStatusCode } from '../tools/lib';
import log from '../tools/log';
import UserController from '../controllers/user.controller';
import { authValid, requestLog } from '../middleware/user.middleware';
import { numberOrDefault } from '../tools/util';
import ReserveController from '../controllers/reserve.controller';
import ServiceController from '../controllers/service.controller';
import EquipmentController from '../controllers/equipment.controller';
import { checkBodyEmpty, checkParamsEmpty } from '../middleware/validator.middleware';
import CartController from '../controllers/cart.controller';
import NotificationController from '../controllers/notification.controller';
import { body } from 'express-validator';

const userRouter: express.Router = express.Router();
const errorCode = createErrCodeJSON();
const unknownErrorCode = createUnknownErrCodeJSON()

userRouter.get('/getUserInfo', authValid, async (req, res) => {
    try {
        const userId = req.body.credentials.id;
        const userInfo = await UserController.getByID(userId)
        res.status(200).json({
            code: 200, user: {
                id: userInfo!.id,
                type_id: userInfo!.type_id,
                fname: userInfo!.fname,
                lname: userInfo!.lname,
                email: userInfo!.email,
                tel: userInfo!.tel,
                booking_permission: userInfo!.booking_permission,
                created_at: userInfo!.created_at,
                update_at: userInfo!.update_at
            }
        });
    } catch (error) {
        log(error)
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

userRouter.post('/register', checkBodyEmpty, async (req, res) => {
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
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
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

userRouter.post('/update/password', checkBodyEmpty, authValid, (req, res) => {
    try {
        const { user_id, old_pass, new_pass } = req.body;
        if (!user_id || !old_pass || !new_pass) {
            res.status(200).json(errorCode(HttpStatusCode.BAD_REQUEST, 'ALLPASSWORD', 'REQUIRED'));
            return;
        }

        UserController.resetPassword(user_id, old_pass, new_pass).then((state) => {
            if (state) {
                res.json({ code: 200, state });
            } else {
                res.status(200).json(errorCode(HttpStatusCode.BAD_REQUEST, 'PASSWORD', 'MISMATCH'));
            }
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }

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

// reserve
userRouter.post('/createReserve', checkBodyEmpty, authValid, async (req, res) => {
    try {
        const equipment = req.body.equipment;
        log(equipment)
        const newReserve = await ReserveController.createReserve(req.body)
        if (newReserve && equipment) {
            for (const data of equipment) {
                await ReserveController.createReserveEquipment(newReserve.id, data)
            }
            res.json({ code: 201 });
        }
        else if (newReserve) {
            res.status(200).json({ code: 201 });
        }
        else {
            res.status(200).json(errorCode(HttpStatusCode.BAD_REQUEST, 'RESERVE', 'ERROR'));
        }
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

// userRouter.post('/createReserveEquipmentOnly', checkBodyEmpty, authValid, async (req, res) => {
//     try {
//         await ReserveController.createReserveEquipmentOnly(req.body)
//         res.status(200).json({ code: 200 });
//         // else {
//         //     res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
//         // }
//     } catch (error) {
//         res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
//     }

// });

userRouter.get('/getAllReserve', checkParamsEmpty, authValid, async (req, res) => {
    try {
        const userId = req.body.credentials.id;
        const approvalStatus = req.query.approval_status as string;
        const limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const offset = limit * Page;
        const allReserve = await ReserveController.getAllReserveAndChildForUser(approvalStatus, userId, limit, offset)
        res.status(200).json({
            code: 200, reserve: allReserve.rows, total_pages: Math.ceil(allReserve.count / limit)
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

userRouter.get('/getSingleReserve', checkParamsEmpty, authValid, async (req, res) => {
    try {
        const reserveId = String(req.query.id)
        const userId = req.body.credentials.id;
        const reserve = await ReserveController.getSingleReserveAndChildForUser(reserveId, userId)
        res.status(200).json({
            code: 200, data: reserve
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

// userRouter.get('/getAllReserveEquipment', checkParamsEmpty, authValid, async (req, res) => {
//     try {
//         const userId = req.body.credentials.id;
//         const Limit = numberOrDefault(req.query.limit, 10);
//         let Page = numberOrDefault(req.query.page, 0);
//         if (Page != 0) {
//             Page = Page - 1
//         }
//         const Offset = Limit * Page;
//         const allReserve = await ReserveController.getAllReserveEquipmentUser(userId, Limit, Offset)
//         res.status(200).json({
//             code: 200, reserve: allReserve.rows, total_pages: Math.ceil(allReserve.count / Limit)
//         });
//     } catch (error) {
//         res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
//     }
// });

// Cart
userRouter.post('/createCartItem', checkBodyEmpty, authValid, requestLog, async (req, res) => {
    try {
        const userId = req.body.credentials.id;
        const equipmentInfoId = String(req.body.id);
        const cart = await CartController.getByUserId(userId);
        const cartId = String(cart?.id);
        await CartController.createItems(cartId, equipmentInfoId);
        res.status(200).json({ code: 200 });
    } catch (error) {
        log(error)
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

userRouter.get('/getAllCart', authValid, async (req, res) => {
    try {
        const userId = req.body.credentials.id;
        const data = await CartController.getAll(userId);
        res.status(200).json({ code: 200, cart: data });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

userRouter.delete('/deleteCartItem', checkParamsEmpty, authValid, requestLog, async (req, res) => {
    try {
        const cartItemId = String(req.query.id);
        await CartController.deleteItems(cartItemId);
        res.status(200).json({ code: 200 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

//notification
userRouter.get('/getAllNotification', checkParamsEmpty, authValid, async (req, res) => {
    try {
        const userId = req.body.credentials.id;
        await NotificationController.getAllAdmin(userId)
        res.status(200).json({ code: 200 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

userRouter.get('/getAllEquipmentInfoInRoom', checkParamsEmpty, async (req, res) => {
    try {
        const Limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const Offset = Limit * Page;
        const data = await EquipmentController.getAllEquipmentInfoInRoomPublic(req.query.id as string, Limit, Offset)
        res.status(200).json({
            code: 200, equipments: data.rows, total_pages: Math.ceil(data.count / Limit), count: data.count
        });
    } catch (error) {
        res.status(401).json({ code: 2, msg: `"unknown error : "${error}` });
    }
});

//dropdown
userRouter.get('/getDropdownEquipmentInfo', checkParamsEmpty, authValid, async (req, res) => {
    try {
        await EquipmentController.getDropdownEquipmentInfoInRoomPublic(req.query.id as string)
        res.status(200).json({ code: 200 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

export default userRouter;
