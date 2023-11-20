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
import { authValid } from '../middleware/admin.middleware';
import { numberOrDefault } from '../tools/util';
import { uploadSinglePicture, uploadSinglePictureV2 } from '../tools/util';
import multer from 'multer';
import { Admin } from '../service/firebase';
import { url } from 'inspector';
import { error } from 'console';
import { IntegerDataType } from 'sequelize';

const bucket = Admin.storage().bucket()
const adminRouter: express.Router = express.Router();
const errorCode = createErrCodeJSON();
const unknownErrorCode = createUnknownErrCodeJSON()
const multerUpload = multer();

adminRouter.get('/getAdminInfo', authValid, async (req, res) => {
    try {
        const AdminId = req.body.credentials.id;

        const adminInfo = await AdminController.getByID(AdminId)
        if (adminInfo) {
            res.status(200).json({
                code: 200,
                admin: {
                    id: adminInfo.id,
                    type_id: adminInfo.type_id,
                    fname: adminInfo.fname,
                    lname: adminInfo.lname,
                    email: adminInfo.email,
                    tel: adminInfo.tel,
                    avatar: adminInfo.avatar,
                    status: adminInfo.status,
                    created_at: adminInfo.created_at,
                    update_at: adminInfo.update_at
                }
            });
        } else {
            res.status(200).json(errorCode(HttpStatusCode.NOT_FOUND, 'ADMIN', 'NOTFOUND'));
        }
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});
//News
adminRouter.get('/getSingleNews', authValid, async (req, res) => {
    try {
        if (!req.query.id) {
            res.status(200).json(errorCode(HttpStatusCode.BAD_REQUEST, 'ID', 'REQUIRED'));
            return;
        }
        const Id = req.query.id as string;
        const singleNews = await NewsController.getByID(Id)
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
        const Limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const Offset = Limit * Page;
        const allNews = await NewsController.getAllNews(Limit, Offset)
        if (allNews) {
            res.status(200).json({
                code: 200, news: allNews.rows, total_pages: Math.ceil(allNews.count / Limit)
            });
        } else {
            res.status(200).json(errorCode(HttpStatusCode.NOT_FOUND, 'NEWS', 'NOTFOUND'));
        }
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.post('/createNews', multerUpload.single("file"), authValid, async (req, res) => {
    try {
        const picture = req.file;
        if (!req.body) {
            res.status(200).json(errorCode(HttpStatusCode.BAD_REQUEST, 'BODY', 'EMPTY'));
            return;
        }
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

adminRouter.post('/updateNews', multerUpload.single("file"), authValid, async (req, res) => {
    try {
        const picture = req.file;
        const Data = req.body;

        if (!Data) {
            res.status(200).json(errorCode(HttpStatusCode.BAD_REQUEST, 'BODY', 'EMPTY'));
            return;
        }

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

//Room
adminRouter.get('/getSingleRoom', async (req, res) => {
    try {
        if (!req.query.id) {
            res.status(200).json(errorCode(HttpStatusCode.NOT_FOUND, 'PARAMS', 'EMPTY'));
            return;
        }
        const Id = req.query.id as string;
        const room = await RoomController.getByID(Id)
        res.status(200).json({
            code: 200, room: room
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.get('/getAllRooms', authValid, async (req, res) => {
    try {
        const Limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const Offset = Limit * Page;
        const allRooms = await RoomController.getAllRooms(Limit, Offset)
        res.status(200).json({
            code: 200, rooms: allRooms.rows, total_pages: Math.ceil(allRooms.count / Limit)
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});
adminRouter.post('/createRoom', multerUpload.single("file"), async (req, res) => {
    try {
        const picture = req.file
        if (!req.body) {
            res.status(200).json(errorCode(HttpStatusCode.BAD_REQUEST, 'BODY', 'EMPTY'));
            return;
        }
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

adminRouter.post('/createRoomPicture', multerUpload.single("file"), async (req, res) => {
    try {
        const picture = req.file;
        if (!req.body) {
            res.status(200).json(errorCode(HttpStatusCode.BAD_REQUEST, 'BODY', 'EMPTY'));
            return;
        }
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

adminRouter.post('/updateRoom', authValid, async (req, res) => {
    try {
        const Data = req.body;
        if (!Data) {
            res.status(200).json(errorCode(HttpStatusCode.BAD_REQUEST, 'BODY', 'EMPTY'));
            return;
        }

        await RoomController.update(Data)
        res.status(200).json({ code: 200 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }

});

// User
adminRouter.post('/createUserType', authValid, async (req, res) => {
    try {
        if (!req.body) {
            res.status(200).json(errorCode(HttpStatusCode.BAD_REQUEST, 'BODY', 'EMPTY'));
            return;
        }

        await UserTypeController.createUserType(req.body)
        res.status(200).json({ code: 201 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.post('/update/password', authValid, (req, res) => {
    try {
        if (!req.body) {
            res.status(200).json(errorCode(HttpStatusCode.BAD_REQUEST, 'BODY', 'EMPTY'));
            return;
        }
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


adminRouter.post('/updateUserType', authValid, async (req, res) => {
    try {
        const Data = req.body;
        if (!Data) {
            res.status(200).json(errorCode(HttpStatusCode.BAD_REQUEST, 'BODY', 'EMPTY'));
            return;
        }

        await UserTypeController.update(Data)
        res.status(200).json({ code: 200 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.post('/updateUser', authValid, async (req, res) => {
    try {
        const Data = req.body;
        if (!Data) {
            res.status(200).json(errorCode(HttpStatusCode.BAD_REQUEST, 'BODY', 'EMPTY'));
            return;
        }

        await UserController.update({
            id: Data.id,
            fname: Data.fname,
            lname: Data.lname,
            type_id: Data.type_id,
            email: Data.email,
            avatar: Data.avatar,
            tel: Data.tel,
            verify_status: Data.verify_status,
            available_status: Data.available_status,
        })
        res.status(200).json({ code: 201 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.get('/getSingleUserType', authValid, async (req, res) => {
    try {
        if (!req.query.id) {
            res.json(errorCode(HttpStatusCode.NOT_FOUND, 'BODY', 'EMPTY'));
            return;
        }
        const id = req.query.id as string;
        const user = await UserTypeController.getByID(id)
        res.status(200).json({
            code: 200, user_type: user
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.get('/getSingleUser', authValid, async (req, res) => {
    try {
        if (!req.query.id) {
            res.json(errorCode(HttpStatusCode.NOT_FOUND, 'BODY', 'EMPTY'));
            return;
        }
        const Id = req.query.id as string;
        const user = await UserController.getByID(Id)
        res.status(200).json({
            code: 200, user
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.get('/getAllUsers', async (req, res) => {
    try {
        const Limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const Offset = Limit * Page;
        const allUsers = await UserController.getAllUsers(Limit, Offset)
        res.status(200).json({
            code: 200, users: allUsers.rows, total_pages: Math.ceil(allUsers.count / Limit)
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.get('/getAllUserTypes', async (req, res) => {
    try {
        const Limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const Offset = Limit * Page;
        const userTypes = await UserTypeController.getAllUserTypes(Limit, Offset)
        res.status(200).json({
            code: 200, user_types: userTypes.rows, totalpages: Math.ceil(userTypes.count / Limit)
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

// Equipment Info
adminRouter.get('/getSingleEquipmentInfo', authValid, async (req, res) => {
    try {
        if (!req.query.id) {
            res.json(errorCode(HttpStatusCode.NOT_FOUND, 'BODY', 'EMPTY'));
            return;
        }
        const Id = req.query.id as string;
        const equipment = await EquipmentController.getSingleEquipmentInfo(Id)
        res.status(200).json({
            code: 200, equipment
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.get('/getAllEquipmentInfo', async (req, res) => {
    try {
        const Limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const Offset = Limit * Page;
        const allEquipments = await EquipmentController.getAllEquipmentInfo(Limit, Offset)
        res.status(200).json({
            code: 200, equipments: allEquipments.rows, total_pages: Math.ceil(allEquipments.count / Limit)
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.get('/getAllEquipmentInfoInRoom', async (req, res) => {
    try {
        const Limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const Offset = Limit * Page;
        const equipmentInfoInRoom = await EquipmentController.getAllEquipmentInfoInRoom(req.query.id as string, Limit, Offset)
        res.status(200).json({
            code: 200, equipments: equipmentInfoInRoom.rows, total_pages: Math.ceil(equipmentInfoInRoom.count / Limit), count: equipmentInfoInRoom.count
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.post('/createEquipmentInfo', multerUpload.single("file"), async (req, res) => {
    try {
        const picture = req.file;

        if (!req.body) {
            res.status(200).json(errorCode(HttpStatusCode.BAD_REQUEST, 'BODY', 'EMPTY'));
            return;
        }
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

adminRouter.post('/updateEquipmentInfo', multerUpload.single("file"), authValid, async (req, res) => {
    try {
        const picture = req.file;
        const Data = req.body;

        if (!Data) {
            res.status(200).json(errorCode(HttpStatusCode.BAD_REQUEST, 'BODY', 'EMPTY'));
            return;
        }

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
//Equipment Stock
adminRouter.get('/getSingleEquipmentStock', authValid, async (req, res) => {
    try {
        if (!req.query.id) {
            res.json(errorCode(HttpStatusCode.BAD_REQUEST, 'QUERY', 'EMPTY'));
            return;
        }
        const Id = req.query.id as string;
        const equipmentStock = await EquipmentController.getSingleEquipmentStock(Id)
        res.status(200).json({
            code: 200, equipment_stock: equipmentStock
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.get('/getAllEquipmentStock', async (req, res) => {
    try {
        const Limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const Offset = Limit * Page;
        const allEquipmentStock = await EquipmentController.getAllEquipmentStock(Limit, Offset)
        res.status(200).json({
            code: 200, equipment_stocks: allEquipmentStock.rows, total_pages: Math.ceil(allEquipmentStock.count / Limit)
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.post('/createEquipmentStock', async (req, res) => {
    try {
        if (!req.body) {
            res.status(200).json(errorCode(HttpStatusCode.BAD_REQUEST, 'BODY', 'EMPTY'));
            return;
        }

        await EquipmentController.createEquipmentStock(req.body)
        res.status(200).json({ code: 200 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }

});

adminRouter.post('/updateEquipmentStock', authValid, async (req, res) => {
    try {
        const Data = req.body;
        if (!Data) {
            res.status(200).json(errorCode(HttpStatusCode.BAD_REQUEST, 'BODY', 'EMPTY'));
            return;
        }

        await EquipmentController.updateEquipmentStock(Data)
        res.status(200).json({ code: 200 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }

});

// reserve
adminRouter.get('/getSingleReserve', async (req, res) => {
    try {
        const id = req.query.id as string;
        const reserve = await ReserveController.getReserveByID(id)
        res.status(200).json({ code: 200, reserve });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.get('/getAllReserve', async (req, res) => {
    try {
        const Limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const Offset = Limit * Page;
        const allReserve = await ReserveController.getAllReserveAndChild(Limit, Offset)
        res.status(200).json({
            code: 200, reserves: allReserve.rows, total_pages: Math.ceil(allReserve.count / Limit)
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.post('/createReserve', async (req, res) => {
    try {
        const equipment = req.body.equipment_info_id;
        if (!req.body) {
            res.status(200).json(errorCode(HttpStatusCode.BAD_REQUEST, 'BODY', 'EMPTY'));
            return;
        }

        const newReserve = await ReserveController.createReserve(req.body)
        if (newReserve && equipment) {
            ReserveController.createReserveEquipment(newReserve.id, req.body)
            res.status(200).json({ code: 200, newReserve });
        }
        else if (newReserve) {
            res.status(200).json({ code: 200, newReserve });
        }
        // else {
        //     res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
        // }
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }

});

adminRouter.post('/updateReserve', authValid, async (req, res) => {
    try {
        const Data = req.body;
        if (!Data) {
            res.status(200).json(errorCode(HttpStatusCode.BAD_REQUEST, 'BODY', 'EMPTY'));
            return;
        }

        await ReserveController.update(Data)
        res.status(200).json({ code: 200 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }

});

adminRouter.post('/updateReserveEquipment', authValid, async (req, res) => {
    try {
        const Data = req.body;
        if (!Data) {
            res.status(200).json(errorCode(HttpStatusCode.BAD_REQUEST, 'BODY', 'EMPTY'));
            return;
        }

        await ReserveController.updateReserveEquipment(Data)
        res.status(200).json({ code: 200 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }

});

//web info
adminRouter.get('/getAllWebInfo', async (req, res) => {
    try {
        const Limit = numberOrDefault(req.query.limit, 1);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const Offset = Limit * Page;
        const webInfo = await WebInfoController.getAll(Limit, Offset)
        res.status(200).json({
            code: 200, webinfo: webInfo.rows, total_pages: Math.ceil(webInfo.count / Limit)
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.post('/updateWebInfo', multerUpload.single("file"), async (req, res) => {
    try {
        const Data = req.body;
        const picture = req.file;
        if (!Data) {
            res.status(200).json(errorCode(HttpStatusCode.BAD_REQUEST, 'BODY', 'EMPTY'));
            return;
        }
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
adminRouter.get('/getSingleService', async (req, res) => {
    try {
        const id = req.query.id as string;
        const service = await ServiceController.getByID(id)
        res.status(200).json({ code: 200, service });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.get('/getAllService', async (req, res) => {
    try {
        const Limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const Offset = Limit * Page;
        const allService = await ServiceController.getAll(Limit, Offset)
        res.status(200).json({
            code: 200, services: allService.rows, total_pages: Math.ceil(allService.count / Limit)
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.post('/createService', multerUpload.single("file"), async (req, res) => {
    try {
        const picture = req.file;

        if (!req.body) {
            res.status(200).json(errorCode(HttpStatusCode.BAD_REQUEST, 'BODY', 'EMPTY'));
            return;
        }
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

adminRouter.post('/updateService', authValid, async (req, res) => {
    try {
        const Data = req.body;
        if (!Data) {
            res.status(200).json(errorCode(HttpStatusCode.BAD_REQUEST, 'BODY', 'EMPTY'));
            return;
        }

        await ServiceController.update(Data)
        res.status(200).json({ code: 200 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }

});

// Production Line
adminRouter.get('/getSingleProductionLine', async (req, res) => {
    try {
        const id = req.query.id as string;
        const productionLine = await EquipmentController.getSingleEquipmentRentRate(id)
        res.status(200).json({ code: 200, production_line: productionLine });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.get('/getAllProductionLine', async (req, res) => {
    try {
        const Limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const Offset = Limit * Page;
        const allProductionLine = await EquipmentController.getAllProductionLine(Limit, Offset)
        res.status(200).json({
            code: 200, production_lines: allProductionLine.rows, total_pages: Math.ceil(allProductionLine.count / Limit)
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.post('/createProductionLine', async (req, res) => {
    try {
        if (!req.body) {
            res.status(200).json(errorCode(HttpStatusCode.BAD_REQUEST, 'BODY', 'EMPTY'));
            return;
        }

        await EquipmentController.createProductionLine(req.body)
        res.status(200).json({ code: 200 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.post('/updateProductionLine', authValid, async (req, res) => {
    try {
        const Data = req.body;
        if (!Data) {
            res.status(200).json(errorCode(HttpStatusCode.BAD_REQUEST, 'BODY', 'EMPTY'));
            return;
        }

        await EquipmentController.updateProductionLine(Data)
        res.status(200).json({ code: 200 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

//Equipment Rent Rate
adminRouter.get('/getSingleEquipmentRentRate', async (req, res) => {
    try {
        const id = req.query.id as string;
        const equipmentRentRate = await EquipmentController.getSingleEquipmentRentRate(id)
        res.status(200).json({ code: 200, equipment_rent_rate: equipmentRentRate });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.get('/getAllEquipmentRentRate', async (req, res) => {
    try {
        const Limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const Offset = Limit * Page;
        const allEquipmentRentRate = await EquipmentController.getAllEquipmentRentRate(Limit, Offset)
        res.status(200).json({
            code: 200, equipment_rent_rates: allEquipmentRentRate.rows, total_pages: Math.ceil(allEquipmentRentRate.count / Limit)
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.post('/createEquipmentRentRate', async (req, res) => {
    try {
        if (!req.body) {
            res.status(200).json(errorCode(HttpStatusCode.BAD_REQUEST, 'BODY', 'EMPTY'));
            return;
        }

        await EquipmentController.createEquipmentRentRate(req.body)
        res.status(200).json({ code: 200 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.post('/updateEquipmentRentRate', authValid, async (req, res) => {
    try {
        const Data = req.body;
        if (!Data) {
            res.status(200).json(errorCode(HttpStatusCode.BAD_REQUEST, 'BODY', 'EMPTY'));
            return;
        }

        await EquipmentController.updateEquipmentRentRate(Data)
        res.status(200).json({ code: 200 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});
//Supply
adminRouter.get('/getSingleSupplyStock', async (req, res) => {
    try {
        const id = Number(req.query.id);
        const supplyStock = await EquipmentController.getSingleSupplyStock(id)
        res.status(200).json({ code: 200, supply_stock: supplyStock });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.get('/getAllSupplyStock', async (req, res) => {
    try {
        const Limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const Offset = Limit * Page;
        const allSupplyStock = await EquipmentController.getAllSupplyStock(Limit, Offset)
        res.status(200).json({
            code: 200, supply_stocks: allSupplyStock.rows, total_pages: Math.ceil(allSupplyStock.count / Limit)
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.post('/createSupplyStock', async (req, res) => {
    try {
        if (!req.body) {
            res.status(200).json(errorCode(HttpStatusCode.BAD_REQUEST, 'BODY', 'EMPTY'));
            return;
        }

        await EquipmentController.createSupplyStock(req.body)
        res.status(200).json({ code: 200 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }

});

adminRouter.post('/updateSupplyStock', authValid, async (req, res) => {
    try {
        const Data = req.body;
        if (!Data) {
            res.status(200).json(errorCode(HttpStatusCode.BAD_REQUEST, 'BODY', 'EMPTY'));
            return;
        }

        await EquipmentController.updateSupplyStock(Data)
        res.status(200).json({ code: 200 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }

});

//Supplier
adminRouter.get('/getSingleSupplier', async (req, res) => {
    try {
        const id = Number(req.query.id);
        const supplier = await EquipmentController.getSingleSupplier(id)
        res.status(200).json({ code: 200, supplier });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.get('/getAllSupplier', async (req, res) => {
    try {
        const Limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const Offset = Limit * Page;
        const allSuppliers = await EquipmentController.getAllSupplier(Limit, Offset)
        res.status(200).json({
            code: 200, suppliers: allSuppliers.rows, total_pages: Math.ceil(allSuppliers.count / Limit)
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.post('/createSupplier', async (req, res) => {
    try {
        if (!req.body) {
            res.status(200).json(errorCode(HttpStatusCode.BAD_REQUEST, 'BODY', 'EMPTY'));
            return;
        }

        await EquipmentController.createSupplier(req.body)
        res.status(200).json({ code: 200 });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }

});

adminRouter.post('/updateSupplier', authValid, async (req, res) => {
    try {
        const Data = req.body;
        if (!Data) {
            res.status(200).json(errorCode(HttpStatusCode.BAD_REQUEST, 'BODY', 'EMPTY'));
            return;
        }

        await EquipmentController.updateSupplier(Data)
        res.status(200).json({ code: 200 });
    } catch (error) {

        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }

});

//Drop down
adminRouter.get('/getDropdownRentRate', async (req, res) => {
    try {
        const data = await EquipmentController.getDropdownRentRate()
        res.status(200).json({
            code: 200, equipment_rent_rates: data,
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.get('/getDropdownProductionLine', async (req, res) => {
    try {
        const data = await EquipmentController.getDropdownProductionLine()
        res.status(200).json({
            code: 200, production_lines: data,
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.get('/getDropdownEquipmentInfo', async (req, res) => {
    try {
        const data = await EquipmentController.getDropdownEquipmentInfo()
        res.status(200).json({
            code: 200, equipments: data,
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

adminRouter.get('/getDropdownRoom', async (req, res) => {
    try {
        const data = await RoomController.getDropdownRoom()
        res.status(200).json({
            code: 200, rooms: data,
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

export default adminRouter;




