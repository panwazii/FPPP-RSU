import express from 'express';
import { createErrCodeJSON } from '../tools/lib';
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

const publicRouter: express.Router = express.Router();
const errorCode = createErrCodeJSON('PUBLIC');

publicRouter.get('/getAllUserTypesDropdown', async (req, res) => {
    try {
        UserTypesController.getAllUserTypesRaw().then((Data) => {
            if (Data) {
                res.status(200).json({
                    code: 200, user_types: Data.rows
                });
            } else {
                res.json(errorCode('ADMIN', 0));
            }
        });
    } catch (error) {
        res.status(401).json(error);
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
                    code: 200, rooms: Data.rows, totalpages: Math.ceil(Data.count / Limit)
                });
            } else {
                res.json(errorCode('ADMIN', 0));
            }
        });
    } catch (error) {
        res.status(401).json(error);
    }
});

publicRouter.get('/getSingleRoom', async (req, res) => {
    try {
        const id = req.query.id as string;
        RoomController.getByID(id).then((Data) => {
            if (Data) {
                res.status(200).json({ code: 200, room: Data });
            } else {
                res.json(errorCode('PUBLIC', 0));
            }
        });
    } catch (error) {
        res.status(401).json(error);
    }
});

publicRouter.get('/getSingleNews', async (req, res) => {
    try {
        const id = req.query.id as string;
        NewsController.getByID(id).then((Data) => {
            if (Data) {
                res.status(200).json({ code: 200, news: Data });
            } else {
                res.json(errorCode('PUBLIC', 0));
            }
        });
    } catch (error) {
        res.status(401).json(error);
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

        WebInfoController.getAll(Limit, Offset).then((Data) => {
            if (Data) {
                res.status(200).json({
                    code: 200, web_infos: Data.rows, totalpages: Math.ceil(Data.count / Limit)
                });
            } else {
                res.json(errorCode('PUBLIC', 0));
            }
        });
    } catch (error) {
        res.status(401).json(error);
    }
});

publicRouter.get('/getSingleEquipmentInfo', async (req, res) => {
    try {
        const id = req.query.id as string;
        EquipmentController.getSingleEquipmentInfo(id).then((Data) => {
            if (Data) {
                res.status(200).json({ code: 200, equipment: Data });
            } else {
                res.json(errorCode('PUBLIC', 0));
            }
        });
    } catch (error) {
        res.status(401).json(error);
    }
});

publicRouter.get('/getAllEquipmentInfo', (req, res) => {
    try {
        const Limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const Offset = Limit * Page;
        EquipmentController.getAllEquipmentInfo(Limit, Offset).then((Data) => {
            if (Data) {
                res.status(200).json({
                    code: 200, equipments: Data.rows, total_pages: Math.ceil(Data.count / Limit)
                });
            } else {
                res.json(errorCode('PUBLIC', 0));
            }
        });
    } catch (error) {
        res.status(401).json({ code: 2, msg: `"unknown error : "${error}` });
    }
});

publicRouter.get('/getAllEquipmentInfoInRoom', (req, res) => {
    try {
        const Limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const Offset = Limit * Page;
        EquipmentController.getAllEquipmentInfoInRoom(req.query.id as string, Limit, Offset).then((Data) => {
            if (Data) {
                res.status(200).json({
                    code: 200, equipments: Data.rows, total_pages: Math.ceil(Data.count / Limit), count: Data.count
                });
            } else {
                res.json(errorCode('PUBLIC', 0));
            }
        });
    } catch (error) {
        res.status(401).json({ code: 2, msg: `"unknown error : "${error}` });
    }
});

publicRouter.get('/getAllService', (req, res) => {
    try {
        const Limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const Offset = Limit * Page;
        ServiceController.getAllShow(Limit, Offset).then((Data) => {
            if (Data) {
                res.status(200).json({
                    code: 200, services: Data.rows, total_pages: Math.ceil(Data.count / Limit)
                });
            } else {
                res.json(errorCode('ADMIN', 0));
            }
        });
    } catch (error) {
        res.status(401).json({ code: 2, msg: `"unknown error : "${error}` });
    }
});

publicRouter.get('/getSingleWebInfo', async (req, res) => {
    try {
        WebInfoController.getByID("1").then((Data) => {
            if (Data) {
                res.status(200).json({ code: 200, web_info: Data });
            } else {
                res.json(errorCode('PUBLIC', 0));
            }
        });
    } catch (error) {
        res.status(401).json(error);
    }
});

export default publicRouter;