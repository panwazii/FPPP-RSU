import express from 'express';
import { createErrCodeJSON, createUnknownErrCodeJSON, HttpStatusCode } from '../tools/lib';
import log from '../tools/log';
import AdminController from '../controllers/admin.controller';
import NewsController from '../controllers/news.controller';
import RoomController from '../controllers/room.controller';
import UserController from '../controllers/user.controller';
import UserTypesController from '../controllers/user_types.controller';
import EquipmentController from '../controllers/equipment.controller';
import WebInfoController from '../controllers/web_info.controller';
import ReserveController from '../controllers/reserve.controller';
import ServiceController from '../controllers/service.controller';
import { numberOrDefault } from '../tools/util';
import { checkBodyEmpty, checkParamsEmpty } from '../middleware/validator.middleware';

const publicRouter: express.Router = express.Router();
const errorCode = createErrCodeJSON();
const unknownErrorCode = createUnknownErrCodeJSON()

publicRouter.get('/getAllUserTypesDropdown', async (req, res) => {
    try {
        const userTypes = await UserTypesController.getAllUserTypesRaw()
        res.status(200).json({
            code: 200, user_types: userTypes.rows
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

publicRouter.get('/getAllNews', async (req, res) => {
    try {
        const Limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const Offset = Limit * Page;
        const allNews = await NewsController.getAllNews(Limit, Offset)
        res.status(200).json({
            code: 200, news: allNews.rows, totalpages: Math.ceil(allNews.count / Limit)
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

publicRouter.get('/getAllRooms', async (req, res) => {
    try {
        const Limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const Offset = Limit * Page;
        const allRooms = await RoomController.getAllRooms(Limit, Offset)
        res.status(200).json({
            code: 200, rooms: allRooms.rows, totalpages: Math.ceil(allRooms.count / Limit)
        });

    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

publicRouter.get('/getSingleRoom', checkParamsEmpty, async (req, res) => {
    try {
        const id = req.query.id as string;
        const room = await RoomController.getByID(id)
        res.status(200).json({ code: 200, room });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

publicRouter.get('/getSingleNews', checkParamsEmpty, async (req, res) => {
    try {
        const id = req.query.id as string;
        const news = await NewsController.getByID(id)
        res.status(200).json({ code: 200, news });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

publicRouter.get('/getAllWebInfos', async (req, res) => {
    try {
        const Limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const Offset = Limit * Page;

        const data = await WebInfoController.getAll(Limit, Offset)
        res.status(200).json({
            code: 200, web_infos: data.rows, totalpages: Math.ceil(data.count / Limit)
        });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

publicRouter.get('/getSingleEquipmentInfo', checkParamsEmpty, async (req, res) => {
    try {
        const id = req.query.id as string;
        const data = await EquipmentController.getSingleEquipmentInfo(id)
        res.status(200).json({ code: 200, equipment: data });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

publicRouter.get('/getAllEquipmentInfo', async (req, res) => {
    try {
        const Limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const Offset = Limit * Page;
        const data = await EquipmentController.getAllEquipmentInfo(Limit, Offset)
        res.status(200).json({
            code: 200, equipments: data.rows, total_pages: Math.ceil(data.count / Limit)
        });
    } catch (error) {
        res.status(401).json({ code: 2, msg: `"unknown error : "${error}` });
    }
});

publicRouter.get('/getAllEquipmentInfoInRoom', checkParamsEmpty, async (req, res) => {
    try {
        const Limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const Offset = Limit * Page;
        const data = await EquipmentController.getAllEquipmentInfoInRoom(req.query.id as string, Limit, Offset)
        res.status(200).json({
            code: 200, equipments: data.rows, total_pages: Math.ceil(data.count / Limit), count: data.count
        });
    } catch (error) {
        res.status(401).json({ code: 2, msg: `"unknown error : "${error}` });
    }
});

publicRouter.get('/getAllService', async (req, res) => {
    try {
        const Limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const Offset = Limit * Page;
        const data = await ServiceController.getAllShow(Limit, Offset)
        res.status(200).json({
            code: 200, services: data.rows, total_pages: Math.ceil(data.count / Limit)
        });
    } catch (error) {
        res.status(401).json({ code: 2, msg: `"unknown error : "${error}` });
    }
});

publicRouter.get('/getSingleWebInfo', async (req, res) => {
    try {
        const data = await WebInfoController.getByID("1")
        res.status(200).json({ code: 200, web_info: data });
    } catch (error) {
        res.status(200).json(unknownErrorCode(HttpStatusCode.INTERNAL_SERVER_ERROR, error as string));
    }
});

export default publicRouter;