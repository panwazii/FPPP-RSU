import express from 'express';
import { createErrCodeJSON } from '../tools/lib';
import log from '../tools/log';
import AdminController from '../controllers/admin.controller';
import NewsController from '../controllers/news.controller';
import RoomController from '../controllers/room.controller';
import UserController from '../controllers/user.controller';
import UserTypesController from '../controllers/user_types.controller';
import EquipmentController from '../controllers/equipment.controller';
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

publicRouter.get('/getAllEquipmentByRoom', async (req, res) => {
    try {
        const id = req.query.id as string;
        const Limit = numberOrDefault(req.query.limit, 10);
        let Page = numberOrDefault(req.query.page, 0);
        if (Page != 0) {
            Page = Page - 1
        }
        const Offset = Limit * Page;
        EquipmentController.getAllEquipmentByRoom(id,Limit, Offset).then((Data) => {
            if (Data) {
                res.status(200).json({
                    code: 200, equip: Data.rows, totalpages: Math.ceil(Data.count / Limit)
                });
            } else {
                res.json(errorCode('PUBLIC', 0));
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

publicRouter.get('/getSingleRoom', async (req, res) => {
    try {
        const id = req.query.id as string; 
        RoomController.getByID(id).then((Data) => {
            if (Data) {
                res.status(200).json({Data});
            } else {
                res.json(errorCode('PUBLIC', 0));
            }
        });
    } catch (error) {
        res.status(401).json(error);
    }
});

export default publicRouter;