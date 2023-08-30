import express from 'express';
import { createErrCodeJSON } from '../tools/lib';
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

const bucket = Admin.storage().bucket()
const testRouter: express.Router = express.Router();
const errorCode = createErrCodeJSON('ADMIN');
const multerUpload = multer();

testRouter.post('/createReserve', (req, res) => {
    try {
        const equipment = req.body.equipment_info_id;
        const equipcount = req.body.equipment_info_id.length
        if (!req.body) {
            res.json(errorCode('RES', 1));
            return;
        }
        
        
        if (equipment) {
            log("Equipment : ",equipment,"Count : ",equipcount);
            return;
        }
        // ReserveController.createReserve(req.body).then((data) => {
        //     if (data.state && equipment) {
        //         ReserveController.createReserveEquipment(data.id, req.body)
        //         res.json({ code: 200, data });
        //     }
        //     else if (data.state) {
        //         res.json({ code: 200, data });
        //     }
        //     else {
        //         res.json(errorCode('CREATE', 2));
        //     }
        // });
    } catch (error) {
        res.status(401).json({ code: 2, msg: `"unknown error : "${error}` });
    }

});

export default testRouter;