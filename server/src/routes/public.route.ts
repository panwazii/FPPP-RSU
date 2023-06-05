import express from 'express';
import { createErrCodeJSON } from '../tools/lib';
import log from '../tools/log';
import AdminController from '../controllers/admin.controller';
import NewsController from '../controllers/news.controller';
import RoomController from '../controllers/room.controller';
import UserController from '../controllers/user.controller';
import EquipmentController from '../controllers/equipment.controller';
import {numberOrDefault} from '../tools/util';

const publicRouter: express.Router = express.Router();
const errorCode = createErrCodeJSON('PUBLIC');

publicRouter.get('/getAllNews' ,async (req, res) => {
    try {
        const limit = numberOrDefault(req.query.limit, 10);
        const page = numberOrDefault(req.query.page, 0);
        if(page != 0){
            page - 1
        }
        const offset = limit * page;
        NewsController.getAllNews(limit,offset).then((Data) => {
            if (Data) {
                res.status(200).json({
                    code: 200, news: Data.rows, totalpages: Math.ceil(Data.count / limit)
                });
            } else {
                res.json(errorCode('ADMIN', 0));
            }
        });
    } catch (error) {
        res.status(401).json(error);
    }
});

publicRouter.get('/getAllRoom' ,async (req, res) => {
    try {
        const limit = numberOrDefault(req.query.limit, 10);
        const page = numberOrDefault(req.query.page, 0);
        if(page != 0){
            page - 1
        }
        const offset = limit * page;
        RoomController.getAllRoom(limit,offset).then((Data) => {
            if (Data) {
                res.status(200).json({
                    code: 200, news: Data.rows, totalpages: Math.ceil(Data.count / limit)
                });
            } else {
                res.json(errorCode('ADMIN', 0));
            }
        });
    } catch (error) {
        res.status(401).json(error);
    }
});

publicRouter.get('/getAllEquipment' ,async (req, res) => {
    try {
        const limit = numberOrDefault(req.query.limit, 10);
        const page = numberOrDefault(req.query.page, 0);
        if(page != 0){
            page - 1
        }
        const offset = limit * page;
        EquipmentController.getAllEquipment(limit,offset).then((Data) => {
            if (Data) {
                res.status(200).json({
                    code: 200, news: Data.rows, totalpages: Math.ceil(Data.count / limit)
                });
            } else {
                res.json(errorCode('ADMIN', 0));
            }
        });
    } catch (error) {
        res.status(401).json(error);
    }
});

publicRouter.get('/getAllGlobalEquipment' ,async (req, res) => {
    try {
        const limit = numberOrDefault(req.query.limit, 10);
        const page = numberOrDefault(req.query.page, 0);
        if(page != 0){
            page - 1
        }
        const offset = limit * page;
        EquipmentController.getAllGlobalEquipment(limit,offset).then((Data) => {
            if (Data) {
                res.status(200).json({
                    code: 200, news: Data.rows, totalpages: Math.ceil(Data.count / limit)
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