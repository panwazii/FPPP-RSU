import express from 'express';
import { createErrCodeJSON, createUnknownErrCodeJSON, HttpStatusCode } from '../tools/lib';
import log from '../tools/log';
import AdminController from '../controllers/admin.controller';
import NewsController from '../controllers/news.controller';
import RoomController from '../controllers/room.controller';
import UserController from '../controllers/user.controller';
import EquipmentController from '../controllers/equipment.controller';
import UserTypeController from '../controllers/user_types.controller';
import ReserveController from '../controllers/reserve.controller';
import ServiceController from '../controllers/service.controller';
import WebInfoController from '../controllers/web_info.controller';
import NotificationController from '../controllers/notification.controller';
import { authValid, requestLog } from '../middleware/admin.middleware';
import { checkBodyEmpty, checkParamsEmpty } from '../middleware/validator.middleware';
import { numberOrDefault } from '../tools/util';
import { uploadSinglePicture, uploadSinglePictureV2 } from '../tools/util';
import multer from 'multer';
import { Admin } from '../service/firebase';

const bucket = Admin.storage().bucket()
const adminRouter: express.Router = express.Router();
const errorCode = createErrCodeJSON();
const unknownErrorCode = createUnknownErrCodeJSON()
const multerUpload = multer();

adminRouter.post('/createAdmin', checkBodyEmpty, authValid, async (req, res) => {
    try {
        const type = req.body.credentials.type;
        if (type !== "SUPERADMIN") {
            return res.status(HttpStatusCode.UNAUTHORIZED).json({ msg: "Kuy" });
        }
        await AdminController.createAdmin(req.body)
        res.status(200).json({ code: 200 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }

});

adminRouter.get('/getAdminInfo', authValid, async (req, res) => {
    try {
        const adminid = req.body.credentials.id;

        const adminInfo = await AdminController.getByID(adminid)
        if (adminInfo) {
            res.status(200).json({
                code: 200,
                admin: {
                    id: adminInfo.id,
                    type: adminInfo.type,
                    fname: adminInfo.fname,
                    lname: adminInfo.lname,
                    email: adminInfo.email,
                    tel: adminInfo.tel,
                    status: adminInfo.status,
                    created_at: adminInfo.created_at,
                    updated_at: adminInfo.updated_at
                }
            });
        } else {
            res.status(200).json(errorCode(HttpStatusCode.NOT_FOUND, 'ADMIN', 'NOTFOUND'));
        }
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.post('/setUserBookingPermission', checkParamsEmpty, authValid, async (req, res) => {
    try {
        // const
        // await UserController.update(req.query)
    } catch (error) {

    }
})

adminRouter.delete('/deleteAdmin', checkBodyEmpty, authValid, requestLog, async (req, res) => {
    try {
        const type = req.body.credentials.type;
        if (type !== "SUPERADMIN") {
            return res.status(HttpStatusCode.UNAUTHORIZED);
        }
        await AdminController.delete(req.body.id)
        res.status(200).json({ code: 200 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

//News
adminRouter.get('/getSingleNews', checkParamsEmpty, authValid, async (req, res) => {
    try {
        const id = req.query.id as string;
        const singleNews = await NewsController.getByIDAdmin(id)
        if (singleNews) {
            res.status(200).json({
                code: 200, news: singleNews
            });
        } else {
            res.status(200).json(errorCode(HttpStatusCode.NOT_FOUND, 'NEWS', 'NOTFOUND'));
        }
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.get('/getAllNews', authValid, async (req, res) => {
    try {
        const searchValue = String(req.query.value);
        const limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const offset = limit * Page;
        const allNews = await NewsController.getAllNewsAdmin(searchValue, limit, offset)
        if (allNews) {
            res.status(200).json({
                code: 200, news: allNews.rows, total_pages: Math.ceil(allNews.count / limit)
            });
        } else {
            res.status(200).json(errorCode(HttpStatusCode.NOT_FOUND, 'NEWS', 'NOTFOUND'));
        }
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.post('/createNews', checkBodyEmpty, multerUpload.single("file"), authValid, async (req, res) => {
    try {
        const picture = req.file;
        if (!picture) {
            req.body.picture = 'https://www.charlotteathleticclub.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png';
            await NewsController.createNews(req.body)
            res.status(200).json({ code: 201 });
        }
        else {
            let pictureUrl = await uploadSinglePicture(
                picture.originalname,
                picture.mimetype,
                picture.buffer);
            req.body.picture = pictureUrl
            await NewsController.createNews(req.body)
            res.status(200).json({ code: 201 });
        }

    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }

});

adminRouter.post('/updateNews', checkBodyEmpty, multerUpload.single("file"), authValid, async (req, res) => {
    try {
        const picture = req.file;
        const Data = req.body;
        if (!picture) {
            await NewsController.update(Data)
            res.status(200).json({ code: 200 });
        }
        else {
            let pictureUrl = await uploadSinglePicture(
                picture.originalname,
                picture.mimetype,
                picture.buffer);
            Data.picture = pictureUrl;
            await NewsController.update(Data)
            res.status(200).json({ code: 200 });
        }
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }

});

adminRouter.delete('/deleteNews', checkBodyEmpty, authValid, requestLog, async (req, res) => {
    try {
        const id = req.body.id
        await NewsController.delete(id)
        res.status(200).json({ code: 201 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

//Room
adminRouter.get('/getSingleRoom', checkParamsEmpty, authValid, async (req, res) => {
    try {
        const id = req.query.id as string;
        const room = await RoomController.getByIDAdmin(id)
        res.status(200).json({
            code: 200, room: room
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.get('/getAllRooms', authValid, async (req, res) => {
    try {
        const limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const offset = limit * Page;
        const allRooms = await RoomController.getAllRoomsAdmin(limit, offset)
        res.status(200).json({
            code: 200, rooms: allRooms.rows, total_pages: Math.ceil(allRooms.count / limit)
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.post('/createRoom', checkBodyEmpty, multerUpload.single("file"), authValid, async (req, res) => {
    try {
        const picture = req.file
        if (!picture) {
            await RoomController.createRoom(req.body)
            res.status(200).json({ code: 201 });
        }
        else {
            let url = await uploadSinglePicture(
                picture.originalname,
                picture.mimetype,
                picture.buffer);
            const newRoom = await RoomController.createRoom(req.body)
            RoomController.createRoomPicture(url as string, newRoom.id as string)
            res.status(200).json({ code: 201 });
        }
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }

});

adminRouter.delete('/deleteRoom', checkBodyEmpty, authValid, requestLog, async (req, res) => {
    try {
        const id = req.body.id
        await RoomController.deleteRoom(id)
        res.status(200).json({ code: 201 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.post('/createRoomPicture', checkBodyEmpty, multerUpload.single("file"), authValid, async (req, res) => {
    try {
        const picture = req.file;
        if (!picture) {
            res.status(200).json(errorCode(HttpStatusCode.NOT_FOUND, 'PICTURE', 'EMPTY'));
            return;
        }
        else {
            let pictureUrl = await uploadSinglePicture(
                picture.originalname,
                picture.mimetype,
                picture.buffer);

            await RoomController.createRoomPicture(pictureUrl as string, req.body.room_id as string)
            res.status(200).json({ code: 201 });
        }

    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }

});

adminRouter.post('/updateRoom', checkBodyEmpty, authValid, async (req, res) => {
    try {
        const Data = req.body;
        await RoomController.update(Data)
        res.status(200).json({ code: 200 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }

});

adminRouter.delete('/deleteRoomPicture', checkBodyEmpty, authValid, requestLog, async (req, res) => {
    try {
        const id = req.body.id
        await RoomController.deleteRoomPicture(id)
        res.status(200).json({ code: 201 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

// User
adminRouter.post('/createUserType', checkBodyEmpty, authValid, async (req, res) => {
    try {
        await UserTypeController.createUserType(req.body)
        res.status(200).json({ code: 201 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.delete('/deleteUserType', checkBodyEmpty, authValid, requestLog, async (req, res) => {
    try {
        const id = req.body.id
        await UserTypeController.delete(id)
        res.status(200).json({ code: 201 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.post('/update/password', checkBodyEmpty, authValid, (req, res) => {
    try {
        const { user_id, old_pass, new_pass } = req.body;
        if (!user_id || !old_pass || !new_pass) {
            res.status(200).json(errorCode(HttpStatusCode.BAD_REQUEST, 'PASSWORD', 'REQUIRED'));
            return;
        }

        UserController.resetPassword(user_id, old_pass, new_pass).then((state) => {
            if (state) {
                res.status(200).json({ code: 200 });
            } else {
                res.status(200).json(errorCode(HttpStatusCode.BAD_REQUEST, 'PASSWORD', 'NOTMATCH'));
            }
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }

});


adminRouter.post('/updateUserType', checkBodyEmpty, authValid, async (req, res) => {
    try {
        const Data = req.body;
        await UserTypeController.update(Data)
        res.status(200).json({ code: 200 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.post('/updateUser', checkBodyEmpty, authValid, async (req, res) => {
    try {
        const Data = req.body;
        await UserController.update(Data.id, {
            fname: Data.fname,
            lname: Data.lname,
            type_id: Data.type_id,
            email: Data.email,
            tel: Data.tel,
            verify_status: Data.verify_status,
            available_status: Data.available_status,
        })
        res.status(200).json({ code: 201 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.get('/getSingleUserType', checkParamsEmpty, authValid, async (req, res) => {
    try {
        const id = req.query.id as string;
        const user = await UserTypeController.getByID(id)
        res.status(200).json({
            code: 200, user_type: user
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.get('/getSingleUser', checkParamsEmpty, authValid, async (req, res) => {
    try {
        const id = req.query.id as string;
        const user = await UserController.getByID(id)
        res.status(200).json({
            code: 200, user
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.get('/getAllUsers', authValid, async (req, res) => {
    try {
        const limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const offset = limit * Page;
        const allUsers = await UserController.getAllUsers(limit, offset)
        res.status(200).json({
            code: 200, users: allUsers.rows, total_pages: Math.ceil(allUsers.count / limit)
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.get('/getAllUserTypes', authValid, async (req, res) => {
    try {
        const limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const offset = limit * Page;
        const userTypes = await UserTypeController.getAllUserTypes(limit, offset)
        res.status(200).json({
            code: 200, user_types: userTypes.rows, totalpages: Math.ceil(userTypes.count / limit)
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

// Equipment Info
adminRouter.get('/getSingleEquipmentInfo', checkParamsEmpty, authValid, async (req, res) => {
    try {
        const id = req.query.id as string;
        const equipment = await EquipmentController.getSingleEquipmentInfoAdmin(id)
        res.status(200).json({
            code: 200, equipment
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.get('/getAllEquipmentInfo', authValid, async (req, res) => {
    try {
        const filterType = Number(req.query.filter);
        const searchValue = String(req.query.value);
        const limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const offset = limit * Page;
        const data = await EquipmentController.getAllEquipmentInfoAdmin(filterType, searchValue, limit, offset)
        res.status(200).json({
            code: 200, equipments: data.rows, total_pages: Math.ceil(data.count / limit)
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.get('/getAllEquipmentInfoInRoom', checkParamsEmpty, authValid, async (req, res) => {
    try {
        const limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const offset = limit * Page;
        const equipmentInfoInRoom = await EquipmentController.getAllEquipmentInfoInRoomAdmin(req.query.id as string, limit, offset)
        res.status(200).json({
            code: 200, equipments: equipmentInfoInRoom.rows, total_pages: Math.ceil(equipmentInfoInRoom.count / limit), count: equipmentInfoInRoom.count
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.post('/createEquipmentInfo', checkBodyEmpty, multerUpload.single("file"), authValid, async (req, res) => {
    try {
        const picture = req.file;
        if (!picture) {
            req.body.picture = 'https://www.charlotteathleticclub.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png';
            await EquipmentController.createEquipmentInfo(req.body)
            res.status(200).json({ code: 201 });
        }
        else {
            let pictureUrl = await uploadSinglePicture(
                picture.originalname,
                picture.mimetype,
                picture.buffer);
            req.body.picture = pictureUrl

            await EquipmentController.createEquipmentInfo(req.body)
            res.status(200).json({ code: 201 });
        }
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.post('/updateEquipmentInfo', checkBodyEmpty, multerUpload.single("file"), authValid, async (req, res) => {
    try {
        const picture = req.file;
        const Data = req.body;
        if (!picture) {
            await EquipmentController.updateEquipmentInfo(Data)
            res.status(200).json({ code: 200 });
        }
        else {
            let pictureUrl = await uploadSinglePicture(
                picture.originalname,
                picture.mimetype,
                picture.buffer);
            Data.picture = pictureUrl;
            await EquipmentController.updateEquipmentInfo(Data)
            res.status(200).json({ code: 200 });
        }
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.delete('/deleteEquipmentInfo', checkBodyEmpty, authValid, requestLog, async (req, res) => {
    try {
        const id = req.body.id
        await EquipmentController.deleteEquipmentInfo(id)
        res.status(200).json({ code: 201 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

//Equipment Stock
adminRouter.get('/getSingleEquipmentStock', checkParamsEmpty, authValid, async (req, res) => {
    try {
        const id = req.query.id as string;
        const equipmentStock = await EquipmentController.getSingleEquipmentStock(id)
        res.status(200).json({
            code: 200, equipment_stock: equipmentStock
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.get('/getAllEquipmentStock', authValid, async (req, res) => {
    try {
        const limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const offset = limit * Page;
        const allEquipmentStock = await EquipmentController.getAllEquipmentStock(limit, offset)
        res.status(200).json({
            code: 200, equipment_stocks: allEquipmentStock.rows, total_pages: Math.ceil(allEquipmentStock.count / limit)
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.post('/createEquipmentStock', checkBodyEmpty, authValid, async (req, res) => {
    try {
        await EquipmentController.createEquipmentStock(req.body)
        res.status(200).json({ code: 200 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }

});

adminRouter.post('/updateEquipmentStock', checkBodyEmpty, authValid, async (req, res) => {
    try {
        const Data = req.body;
        await EquipmentController.updateEquipmentStock(Data)
        res.status(200).json({ code: 200 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }

});

adminRouter.delete('/deleteEquipmentStock', checkBodyEmpty, authValid, requestLog, async (req, res) => {
    try {
        const id = req.body.id
        await EquipmentController.deleteEquipment(id)
        res.status(200).json({ code: 201 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

// reserve
// adminRouter.get('/getSingleReserve', checkParamsEmpty, authValid, async (req, res) => {
//     try {
//         const id = req.query.id as string;
//         const reserve = await ReserveController.getReserveByID(id)
//         res.status(200).json({ code: 200, reserve });
//     } catch (error) {
//         res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
//     }
// });

adminRouter.get('/getAllReserve', checkParamsEmpty, authValid, async (req, res) => {
    try {
        const approvalStatus = req.query.approval_status as string;
        const limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const offset = limit * Page;
        const allReserve = await ReserveController.getAllReserveAndChild(approvalStatus, limit, offset)
        res.status(200).json({
            code: 200, reserves: allReserve.rows, total_pages: Math.ceil(allReserve.count / limit)
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.get('/getSingleReserve', checkParamsEmpty, authValid, async (req, res) => {
    try {
        const reserveId = String(req.query.id)
        const userId = req.body.credentials.id;
        const reserve = await ReserveController.getSingleReserveAndChild(reserveId)
        res.status(200).json({
            code: 200, data: reserve
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.post('/createReserve', checkBodyEmpty, authValid, async (req, res) => {
    try {
        const equipment = req.body.equipment_info_id;
        const newReserve = await ReserveController.createReserve(req.body)
        if (newReserve && equipment) {
            ReserveController.createReserveEquipment(newReserve.id, req.body)
            res.status(200).json({ code: 200 });
        }
        else if (newReserve) {
            res.status(200).json({ code: 200 });
        }
        else {
            res.status(200).json(errorCode(HttpStatusCode.BAD_REQUEST, 'RESERVE', 'ERROR'));
        }
        // else {
        //     res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
        // }
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }

});

adminRouter.post('/updateReserve', checkBodyEmpty, authValid, async (req, res) => {
    try {
        const Data = req.body;
        const reserveId = req.body.reserve_id;
        await ReserveController.update(reserveId, Data)
        res.status(200).json({ code: 200 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }

});

adminRouter.post('/cancelReserve', checkBodyEmpty, authValid, async (req, res) => {
    try {
        const reserveId = req.body.id;
        await ReserveController.deleteQuotationByReserveId(reserveId)
        await ReserveController.update(reserveId, { approval_status: "CANCEL" })
        res.status(200).json({ code: 200 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }

});

adminRouter.delete('/deleteReserve', checkBodyEmpty, authValid, requestLog, async (req, res) => {
    try {
        const id = req.body.id
        await ReserveController.deleteReserve(id)
        res.status(200).json({ code: 201 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.post('/updateReserveEquipment', checkBodyEmpty, authValid, async (req, res) => {
    try {
        const Data = req.body;
        await ReserveController.updateReserveEquipment(Data)
        res.status(200).json({ code: 200 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.get('/countReserve', checkParamsEmpty, authValid, async (req, res) => {
    try {
        const reserve = await ReserveController.getAllReserveAdmin()
        let countReserve = {
            waiting: 0,
            return_quotation: 0,
            confirm_quotation: 0,
            confirm: 0,
            cancel: 0,
        }

        reserve.forEach(reserve => {
            if (reserve.approval_status == 'WAITING') {
                countReserve.waiting += 1
            }
            if (reserve.approval_status == 'RETURN_QUOTATION') {
                countReserve.return_quotation += 1
            }
            if (reserve.approval_status == 'CONFIRM_QUOTATION') {
                countReserve.confirm_quotation += 1
            }
            if (reserve.approval_status == 'CONFIRM') {
                countReserve.confirm += 1
            }
            if (reserve.approval_status == 'CANCEL') {
                countReserve.cancel += 1
            }
        });
        res.status(200).json({
            code: 200, count_reserve: countReserve
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

// reserve equipment
// adminRouter.get('/getSingleReserveEquipmentOnly', checkParamsEmpty, authValid, async (req, res) => {
//     try {
//         const id = req.query.id as string;
//         const reserve = await ReserveController.getReserveEquipmentByID(id)
//         res.status(200).json({ code: 200, reserve });
//     } catch (error) {
//         res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
//     }
// });

// adminRouter.get('/getAllReserveEquipmentOnly', authValid, async (req, res) => {
//     try {
//         const limit = numberOrDefault(req.query.limit, 10);
//         let Page = numberOrDefault(req.query.page, 0);
//         if (Page != 0) {
//             Page = Page - 1
//         }
//         const offset = limit * Page;
//         const allReserve = await ReserveController.getAllReserveEquipment(limit, offset)
//         res.status(200).json({
//             code: 200, reserves: allReserve.rows, total_pages: Math.ceil(allReserve.count / limit)
//         });
//     } catch (error) {
//         res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
//     }
// });

// adminRouter.post('/createReserveEquipmentOnly', checkBodyEmpty, authValid, async (req, res) => {
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

// adminRouter.post('/updateReserveEquipmentOnly', checkBodyEmpty, authValid, async (req, res) => {
//     try {
//         const Data = req.body;
//         await ReserveController.updateReserveEquipmentOnly(Data)
//         res.status(200).json({ code: 200 });
//     } catch (error) {
//         res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
//     }

// });

//web info
adminRouter.get('/getAllWebInfo', authValid, async (req, res) => {
    try {
        const limit = numberOrDefault(req.query.limit, 1);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const offset = limit * Page;
        const webInfo = await WebInfoController.getAll(limit, offset)
        res.status(200).json({
            code: 200, webinfo: webInfo.rows, total_pages: Math.ceil(webInfo.count / limit)
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.post('/updateWebInfo', checkBodyEmpty, multerUpload.single("file"), authValid, async (req, res) => {
    try {
        const Data = req.body;
        const picture = req.file;
        if (!picture) {
            await WebInfoController.update(Data)
            res.status(200).json({ code: 200 });
        }
        else {
            let pic: any = await uploadSinglePictureV2(
                picture.originalname,
                picture.mimetype,
                picture.buffer);
            Data.picture_name = pic.name;
            Data.picture_url = pic.url;

            await WebInfoController.update(Data)
            res.status(200).json({ code: 200 });
        }
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }

});

//service
adminRouter.get('/getSingleService', checkParamsEmpty, authValid, async (req, res) => {
    try {
        const id = req.query.id as string;
        const service = await ServiceController.getByID(id)
        res.status(200).json({ code: 200, service });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.get('/getAllService', authValid, async (req, res) => {
    try {
        const limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const offset = limit * Page;
        const allService = await ServiceController.getAll(limit, offset)
        res.status(200).json({
            code: 200, services: allService.rows, total_pages: Math.ceil(allService.count / limit)
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.post('/createService', checkBodyEmpty, multerUpload.single("file"), authValid, async (req, res) => {
    try {
        const picture = req.file;
        if (!picture) {
            req.body.picture = 'https://www.charlotteathleticclub.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png';
            await ServiceController.create(req.body)
            res.status(200).json({ code: 201 });
        }
        else {
            let pictureUrl = await uploadSinglePicture(
                picture.originalname,
                picture.mimetype,
                picture.buffer);
            req.body.picture = pictureUrl

            await ServiceController.create(req.body)
            res.status(200).json({ code: 201 });
        }
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.post('/updateService', checkBodyEmpty, authValid, async (req, res) => {
    try {
        const Data = req.body;
        await ServiceController.update(Data)
        res.status(200).json({ code: 200 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }

});

// Production Line
adminRouter.get('/getSingleProductionLine', checkParamsEmpty, authValid, async (req, res) => {
    try {
        const id = req.query.id as string;
        const productionLine = await EquipmentController.getSingleEquipmentRentRate(id)
        res.status(200).json({ code: 200, production_line: productionLine });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.get('/getAllProductionLine', authValid, async (req, res) => {
    try {
        const limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const offset = limit * Page;
        const allProductionLine = await EquipmentController.getAllProductionLine(limit, offset)
        res.status(200).json({
            code: 200, production_lines: allProductionLine.rows, total_pages: Math.ceil(allProductionLine.count / limit)
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.post('/createProductionLine', checkBodyEmpty, authValid, async (req, res) => {
    try {
        await EquipmentController.createProductionLine(req.body)
        res.status(200).json({ code: 200 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.post('/updateProductionLine', checkBodyEmpty, authValid, async (req, res) => {
    try {
        const Data = req.body;
        await EquipmentController.updateProductionLine(Data)
        res.status(200).json({ code: 200 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.delete('/deleteProductionLine', checkBodyEmpty, authValid, requestLog, async (req, res) => {
    try {
        const id = req.body.id
        await EquipmentController.deleteProductionLine(id)
        res.status(200).json({ code: 201 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

//Equipment Rent Rate
adminRouter.get('/getSingleEquipmentRentRate', checkParamsEmpty, authValid, async (req, res) => {
    try {
        const id = req.query.id as string;
        const equipmentRentRate = await EquipmentController.getSingleEquipmentRentRate(id)
        res.status(200).json({ code: 200, equipment_rent_rate: equipmentRentRate });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.get('/getAllEquipmentRentRate', authValid, async (req, res) => {
    try {
        const limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const offset = limit * Page;
        const allEquipmentRentRate = await EquipmentController.getAllEquipmentRentRate(limit, offset)
        res.status(200).json({
            code: 200, equipment_rent_rates: allEquipmentRentRate.rows, total_pages: Math.ceil(allEquipmentRentRate.count / limit)
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.post('/createEquipmentRentRate', checkBodyEmpty, authValid, async (req, res) => {
    try {
        await EquipmentController.createEquipmentRentRate(req.body)
        res.status(200).json({ code: 200 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.post('/updateEquipmentRentRate', checkBodyEmpty, authValid, async (req, res) => {
    try {
        const Data = req.body;
        await EquipmentController.updateEquipmentRentRate(Data)
        res.status(200).json({ code: 200 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.delete('/deleteEquipmentRentRate', checkBodyEmpty, authValid, requestLog, async (req, res) => {
    try {
        const id = req.body.id
        await EquipmentController.deleteEquipmentRentRate(id)
        res.status(200).json({ code: 201 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

//Supply
adminRouter.get('/getSingleSupplyStock', authValid, async (req, res) => {
    try {
        const id = Number(req.query.id);
        const supplyStock = await EquipmentController.getSingleSupplyStock(id)
        res.status(200).json({ code: 200, supply_stock: supplyStock });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.get('/getAllSupplyStock', authValid, async (req, res) => {
    try {
        const limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const offset = limit * Page;
        const allSupplyStock = await EquipmentController.getAllSupplyStock(limit, offset)
        res.status(200).json({
            code: 200, supply_stocks: allSupplyStock.rows, total_pages: Math.ceil(allSupplyStock.count / limit)
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.post('/createSupplyStock', checkBodyEmpty, authValid, async (req, res) => {
    try {
        await EquipmentController.createSupplyStock(req.body)
        res.status(200).json({ code: 200 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }

});

adminRouter.post('/updateSupplyStock', checkBodyEmpty, authValid, async (req, res) => {
    try {
        const Data = req.body;
        await EquipmentController.updateSupplyStock(Data)
        res.status(200).json({ code: 200 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.delete('/deleteSupply', checkBodyEmpty, authValid, requestLog, async (req, res) => {
    try {
        const id = req.body.id
        await EquipmentController.deleteSupply(id)
        res.status(200).json({ code: 201 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

//Supplier
adminRouter.get('/getSingleSupplier', checkParamsEmpty, authValid, async (req, res) => {
    try {
        const id = Number(req.query.id);
        const supplier = await EquipmentController.getSingleSupplier(id)
        res.status(200).json({ code: 200, supplier });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.get('/getAllSupplier', authValid, async (req, res) => {
    try {
        const limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const offset = limit * Page;
        const allSuppliers = await EquipmentController.getAllSupplier(limit, offset)
        res.status(200).json({
            code: 200, suppliers: allSuppliers.rows, total_pages: Math.ceil(allSuppliers.count / limit)
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.post('/createSupplier', checkBodyEmpty, authValid, requestLog, async (req, res) => {
    try {
        await EquipmentController.createSupplier(req.body)
        res.status(200).json({ code: 200 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }

});

adminRouter.post('/updateSupplier', checkBodyEmpty, authValid, async (req, res) => {
    try {
        const Data = req.body;
        await EquipmentController.updateSupplier(Data)
        res.status(200).json({ code: 200 });
    } catch (error) {

        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }

});

adminRouter.delete('/deleteSupplier', checkBodyEmpty, authValid, requestLog, async (req, res) => {
    try {
        const id = req.body.id
        await EquipmentController.deleteSupplier(id)
        res.status(200).json({ code: 201 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

//Drop down
adminRouter.get('/getDropdownRentRate', authValid, async (req, res) => {
    try {
        const data = await EquipmentController.getDropdownRentRate()
        res.status(200).json({
            code: 200, equipment_rent_rates: data,
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.get('/getDropdownProductionLine', authValid, async (req, res) => {
    try {
        const data = await EquipmentController.getDropdownProductionLine()
        res.status(200).json({
            code: 200, production_lines: data,
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.get('/getDropdownEquipmentInfo', authValid, async (req, res) => {
    try {
        const data = await EquipmentController.getDropdownEquipmentInfo()
        res.status(200).json({
            code: 200, equipments: data,
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.get('/getDropdownRoom', authValid, async (req, res) => {
    try {
        const data = await RoomController.getDropdownRoom()
        res.status(200).json({
            code: 200, rooms: data,
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

//tab 1&2
adminRouter.post('/updateTab1', checkBodyEmpty, authValid, async (req, res) => {
    try {
        const { title, content, picture } = req.body;
        await WebInfoController.updateTab1(title, content, picture)
        res.status(200).json({ code: 200 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.post('/updateTab2', checkBodyEmpty, authValid, async (req, res) => {
    try {
        const { title, content, picture } = req.body;
        await WebInfoController.updateTab2(title, content, picture)
        res.status(200).json({ code: 200 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

//notification
adminRouter.get('/getAllNotification', checkParamsEmpty, authValid, async (req, res) => {
    try {
        const adminId = req.body.credentials.id;
        const notification = await NotificationController.getAllAdmin(adminId)
        res.status(200).json({ code: 200, notification: notification, });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.delete('/deleteNotification', checkBodyEmpty, authValid, requestLog, async (req, res) => {
    try {
        const id = req.body.id
        await NotificationController.deleteAdmin(id)
        res.status(200).json({ code: 201 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

//quotation
adminRouter.get('/getSingleQuotation', checkParamsEmpty, authValid, async (req, res) => {
    try {
        const quotation = await ReserveController.getSingleQuotation(req.query.reserve_id as string)
        res.status(200).json({ code: 200, quotation: quotation, });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.post('/createQuotation', checkBodyEmpty, authValid, async (req, res) => {
    try {
        const adminId = req.body.credentials.id;
        const reserveId = req.body.reserve_id;
        await ReserveController.createQuotation(adminId, req.body)
        await ReserveController.update(reserveId, { approval_status: "RETURN_QUOTATION" })
        res.status(200).json({ code: 201 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.post('/updateQuotation', checkBodyEmpty, authValid, async (req, res) => {
    try {
        const adminId = req.body.credentials.id;
        await ReserveController.updateQuotation(adminId, req.body)
        res.status(200).json({ code: 200 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.delete('/deleteQuotation', checkBodyEmpty, authValid, requestLog, async (req, res) => {
    try {
        const id = req.body.id
        await ReserveController.deleteQuotationByReserveId(id)
        res.status(200).json({ code: 201 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

//report
adminRouter.get('/getAllReport', checkParamsEmpty, authValid, async (req, res) => {
    try {
        const limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const offset = limit * Page;
        const report = await EquipmentController.getAllReport(limit, offset)
        res.status(200).json({ code: 200, report: report, });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.get('/getSingleReport', checkParamsEmpty, authValid, async (req, res) => {
    try {
        const id = req.body.id
        const report = await EquipmentController.getSingleReport(id)
        res.status(200).json({ code: 200, report: report, });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.delete('/deleteReport', checkBodyEmpty, authValid, async (req, res) => {
    try {
        const id = req.body.id
        await EquipmentController.deleteReport(id)
        res.status(200).json({ code: 201 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.post('/updateReport', checkBodyEmpty, authValid, async (req, res) => {
    try {
        const id = req.body.id
        await EquipmentController.updateReport(id)
        res.status(200).json({ code: 200 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

export default adminRouter;




