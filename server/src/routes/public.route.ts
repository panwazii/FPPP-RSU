import express from 'express';
import { createErrCodeJSON } from '../tools/lib';
import log from '../tools/log';
import AdminController from '../controllers/admin.controller';
import NewsController from '../controllers/news.controller';
import RoomController from '../controllers/room.controller';
import UserController from '../controllers/user.controller';
import EquipmentController from '../controllers/equipment.controller';
import { numberOrDefault } from '../tools/util';

const publicRouter: express.Router = express.Router();
const errorCode = createErrCodeJSON('PUBLIC');

publicRouter.get('/getAllNews', async (req, res) => {
    try {
        const Limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const Offset = Limit * Page;
        NewsController.getAllNews(Limit, Offset).then((Data) => {
            if (Data) {
                res.status(200).json({
                    code: 200, news: Data.rows, totalpages: Math.ceil(Data.count / Limit)
                });
            } else {
                res.json(errorCode('ADMIN', 0));
            }
        });
    } catch (error) {
        res.status(401).json(error);
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
        RoomController.getAllRooms(Limit, Offset).then((Data) => {
            if (Data) {
                res.status(200).json({
                    code: 200, news: Data.rows, totalpages: Math.ceil(Data.count / Limit)
                });
            } else {
                res.json(errorCode('ADMIN', 0));
            }
        });
    } catch (error) {
        res.status(401).json(error);
    }
});

publicRouter.get('/getAllEquipment', async (req, res) => {
    try {
        const Limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const Offset = Limit * Page;
        EquipmentController.getAllEquipment(Limit, Offset).then((Data) => {
            if (Data) {
                res.status(200).json({
                    code: 200, news: Data.rows, totalpages: Math.ceil(Data.count / Limit)
                });
            } else {
                res.json(errorCode('ADMIN', 0));
            }
        });
    } catch (error) {
        res.status(401).json(error);
    }
});

publicRouter.get('/getAllGlobalEquipment', async (req, res) => {
    try {
        const Limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const Offset = Limit * Page;
        EquipmentController.getAllGlobalEquipment(Limit, Offset).then((Data) => {
            if (Data) {
                res.status(200).json({
                    code: 200, news: Data.rows, totalpages: Math.ceil(Data.count / Limit)
                });
            } else {
                res.json(errorCode('ADMIN', 0));
            }
        });
    } catch (error) {
        res.status(401).json(error);
    }
});

export default publicRouter;