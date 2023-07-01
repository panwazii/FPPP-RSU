import express from 'express';
import { createErrCodeJSON } from '../tools/lib';
import log from '../tools/log';
import AdminController from '../controllers/admin.controller';
import NewsController from '../controllers/news.controller';
import RoomController from '../controllers/room.controller';
import UserController from '../controllers/user.controller';
import EquipmentController from '../controllers/equipment.controller';
import UserTypeController from '../controllers/user_types.controller';
import { authValid } from '../middleware/admin.middleware';
import { numberOrDefault } from '../tools/util';
import { uploadSinglePicture } from '../tools/util';
import multer from 'multer';

const adminRouter: express.Router = express.Router();
const errorCode = createErrCodeJSON('ADMIN');
const multerUpload = multer();

adminRouter.get('/getAdminInfo', authValid, async (req, res) => {
    try {
        const AdminId = req.body.credentials.id;

        AdminController.getByID(AdminId).then((user) => {
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
        res.status(401).json({ code: 2, msg: `"unknown error : "${error}` });
    }
});

adminRouter.post('/createNews', multerUpload.single("file"), authValid, async (req, res) => {
    try {
        const picture = req.file;
        if (!req.body) {
            res.json(errorCode('RES', 1));
            return;
        }
        if (!picture) {
            req.body.picture = 'https://www.charlotteathleticclub.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png';
            NewsController.createNews(req.body).then((state) => {
                if (state) {
                    log("this is state", state)
                    res.json({ code: 201, state });
                } else {
                    res.json(errorCode('CREATE', 2));
                }
            });
        }
        else {
            let pictureUrl = await uploadSinglePicture(
                picture.originalname,
                picture.mimetype,
                picture.buffer);
            req.body.picture = pictureUrl

            NewsController.createNews(req.body).then((state) => {
                if (state) {
                    log("this is state", state)
                    res.json({ code: 201, state });
                } else {
                    res.json(errorCode('CREATE', 2));
                }
            });
        }

    } catch (error) {
        log(error);

        res.status(401).json({ code: 2, msg: `"unknown error : "${error}` });
    }

});

adminRouter.post('/createRoom', authValid, (req, res) => {
    try {
        if (!req.body) {
            res.json(errorCode('RES', 1));
            return;
        }

        RoomController.createRoom(req.body).then((state) => {
            if (state) {
                res.json({ code: 200, state });
            } else {
                res.json(errorCode('CREATE', 2));
            }
        });
    } catch (error) {
        res.status(401).json({ code: 2, msg: `"unknown error : "${error}` });
    }

});

adminRouter.post('/createEquipment', multerUpload.single("file"), authValid, async (req, res) => {
    try {
        const picture = req.file;
        if (!req.body) {
            res.json(errorCode('RES', 1));
            return;
        }
        if (!picture) {
            req.body.picture = 'https://www.charlotteathleticclub.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png';
            EquipmentController.createEquipment(req.body).then((state) => {
                if (state) {
                    log("this is state", state)
                    res.json({ code: 201, state });
                } else {
                    res.json(errorCode('CREATE', 2));
                }
            });
        }
        else {
            let pictureUrl = await uploadSinglePicture(
                picture.originalname,
                picture.mimetype,
                picture.buffer);
            req.body.picture = pictureUrl

            EquipmentController.createEquipment(req.body).then((state) => {
                if (state) {
                    log("this is state", state)
                    res.json({ code: 201, state });
                } else {
                    res.json(errorCode('CREATE', 2));
                }
            });
        }
    } catch (error) {
        res.status(401).json({ code: 2, msg: `"unknown error : "${error}` });
    }
});

adminRouter.post('/createGlobalEquipment', multerUpload.single("file"), authValid, async (req, res) => {
    try {
        const picture = req.file;
        if (!req.body) {
            res.json(errorCode('RES', 1));
            return;
        }
        if (!picture) {
            req.body.picture = 'https://www.charlotteathleticclub.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png';
            EquipmentController.createGlobalEquipment(req.body).then((state) => {
                if (state) {
                    log("this is state", state)
                    res.json({ code: 201, state });
                } else {
                    res.json(errorCode('CREATE', 2));
                }
            });
        }
        else {
            let pictureUrl = await uploadSinglePicture(
                picture.originalname,
                picture.mimetype,
                picture.buffer);
            req.body.picture = pictureUrl

            EquipmentController.createGlobalEquipment(req.body).then((state) => {
                if (state) {
                    log("this is state", state)
                    res.json({ code: 201, state });
                } else {
                    res.json(errorCode('CREATE', 2));
                }
            });
        }
    } catch (error) {
        res.status(401).json({ code: 2, msg: `"unknown error : "${error}` });
    }
});

adminRouter.post('/createUserType', authValid, (req, res) => {
    try {
        if (!req.body) {
            res.json(errorCode('RES', 1));
            return;
        }

        UserTypeController.createUserType(req.body).then((state) => {
            if (state) {
                res.json({ code: 201, state });
            } else {
                res.json(errorCode('CREATE', 2));
            }
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({ code: 2, msg: `"unknown error : "${error}` });
    }
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

adminRouter.post('/updateNews', multerUpload.single("file"), authValid, async (req, res) => {
    try {
        const picture = req.file;
        const Data = req.body;

        if (!Data) {
            res.json(errorCode('update', 1));
            return;
        }

        if (!picture) {
            NewsController.update(Data).then((result) => {
                if (result) {
                    res.json({ code: 200, result });
                } else {
                    res.json(errorCode('UPDATE', 2));
                }
            });
        }
        else {
            let pictureUrl = await uploadSinglePicture(
                picture.originalname,
                picture.mimetype,
                picture.buffer);
            Data.picture = pictureUrl;
            NewsController.update(Data).then((result) => {
                if (result) {
                    res.json({ code: 200, result });
                } else {
                    res.json(errorCode('UPDATE', 2));
                }
            });
        }

    } catch (error) {
        log(error)
        res.status(401).json({ code: 2, msg: `"unknown error : "${error}` });
    }

});

adminRouter.post('/updateRoom', authValid, (req, res) => {
    try {
        const Data = req.body;
        if (!Data) {
            res.json(errorCode('update', 1));
            return;
        }

        RoomController.update(Data).then((result) => {
            if (result) {
                res.json({ code: 200, result });
            } else {
                res.json(errorCode('UPDATE', 2));
            }
        });
    } catch (error) {
        log(error)
        res.status(401).json({ code: 2, msg: `"unknown error : "${error}` });
    }

});

adminRouter.post('/updateEquipment', multerUpload.single("file"), authValid, async (req, res) => {
    try {
        const picture = req.file;
        const Data = req.body;

        if (!Data) {
            res.json(errorCode('update', 1));
            return;
        }

        if (!picture) {
            EquipmentController.updateEquipment(Data, false).then((result) => {
                if (result) {
                    res.json({ code: 200, result });
                } else {
                    res.json(errorCode('UPDATE', 2));
                }
            });
        }
        else {
            let pictureUrl = await uploadSinglePicture(
                picture.originalname,
                picture.mimetype,
                picture.buffer);
            Data.picture = pictureUrl;
            EquipmentController.updateEquipment(Data, false).then((result) => {
                if (result) {
                    res.json({ code: 200, result });
                } else {
                    res.json(errorCode('UPDATE', 2));
                }
            });
        }
    } catch (error) {
        log(error)
        res.status(401).json({ code: 2, msg: `"unknown error : "${error}` });
    }
});

adminRouter.post('/updateGlobalEquipment', multerUpload.single("file"), authValid, async (req, res) => {
    try {
        const picture = req.file;
        const Data = req.body;

        if (!Data) {
            res.json(errorCode('update', 1));
            return;
        }

        if (!picture) {
            EquipmentController.updateEquipment(Data, true).then((result) => {
                if (result) {
                    res.json({ code: 200, result });
                } else {
                    res.json(errorCode('UPDATE', 2));
                }
            });
        }
        else {
            let pictureUrl = await uploadSinglePicture(
                picture.originalname,
                picture.mimetype,
                picture.buffer);
            Data.picture = pictureUrl;
            EquipmentController.updateEquipment(Data, true).then((result) => {
                if (result) {
                    res.json({ code: 200, result });
                } else {
                    res.json(errorCode('UPDATE', 2));
                }
            });
        }
    } catch (error) {
        log(error)
        res.status(401).json({ code: 2, msg: `"unknown error : "${error}` });
    }
});

adminRouter.post('/updateUserType', authValid, (req, res) => {
    try {
        const Data = req.body;
        if (!Data) {
            res.json(errorCode('update', 1));
            return;
        }

        UserTypeController.update(Data).then((result) => {
            if (result) {
                res.json({ code: 200, result });
            } else {
                res.json(errorCode('UPDATE', 2));
            }
        });
    } catch (error) {
        log(error)
        res.status(401).json({ code: 2, msg: `"unknown error : "${error}` });
    }
});

adminRouter.post('/updateUser', authValid, (req, res) => {
    try {
        const Data = req.body;
        if (!Data) {
            res.json(errorCode('update', 1));
            return;
        }

        UserController.update({
            id: Data.id,
            fname: Data.fname,
            lname: Data.lname,
            type_id: Data.type_id,
            email: Data.email,
            avatar: Data.avatar,
            tel: Data.tel,
            verify_status: Data.verify_status,
            available_status: Data.available_status,
        }).then((result) => {
            if (result) {
                return res.json({ code: 201, result });
            } else {
                return res.json(errorCode('UPDATE', 2));
            }
        });
    } catch (error) {
        console.log("error here");

        log(error)
        res.status(401).json({ code: 2, msg: `"unknown error : "${error}` });
    }
});

adminRouter.get('/getAllRooms', authValid, (req, res) => {
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
                    code: 200, rooms: Data.rows, total_pages: Math.ceil(Data.count / Limit)
                });
            } else {
                res.json(errorCode('ADMIN', 0));
            }
        });
    } catch (error) {
        res.status(401).json({ code: 2, msg: `"unknown error : "${error}` });
    }
});

adminRouter.get('/getAllEquipment', authValid, (req, res) => {
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
                    code: 200, equipments: Data.rows, total_pages: Math.ceil(Data.count / Limit)
                });
            } else {
                res.json(errorCode('ADMIN', 0));
            }
        });
    } catch (error) {
        res.status(401).json({ code: 2, msg: `"unknown error : "${error}` });
    }
});

adminRouter.get('/getAllGlobalEquipment', authValid, (req, res) => {
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
                    code: 200, global_equipment: Data.rows, total_pages: Math.ceil(Data.count / Limit)
                });
            } else {
                res.json(errorCode('ADMIN', 0));
            }
        });
    } catch (error) {
        res.status(401).json({ code: 2, msg: `"unknown error : "${error}` });
    }
});

adminRouter.get('/getAllNews', authValid, (req, res) => {
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
                    code: 200, news: Data.rows, total_pages: Math.ceil(Data.count / Limit)
                });
            } else {
                res.json(errorCode('ADMIN', 0));
            }
        });
    } catch (error) {
        res.status(401).json({ code: 2, msg: `"unknown error : "${error}` });
    }
});

adminRouter.get('/getSingleRoom', authValid, (req, res) => {
    try {
        if (!req.query.id) {
            res.json(errorCode('ADMIN', 1));
            return;
        }
        const Id = req.query.id as string;
        RoomController.getByID(Id).then((Data) => {
            if (Data) {
                res.status(200).json({
                    code: 200, room: Data
                });
            } else {
                res.json(errorCode('ADMIN', 0));
            }
        });
    } catch (error) {
        res.status(401).json({ code: 2, msg: `"unknown error : "${error}` });
    }
});

adminRouter.get('/getSingleEquipment', authValid, (req, res) => {
    try {
        if (!req.query.id) {
            res.json(errorCode('ADMIN', 1));
            return;
        }
        const Id = req.query.id as string;
        EquipmentController.getByID(Id, false).then((Data) => {
            if (Data) {
                res.status(200).json({
                    code: 200, equipment: Data
                });
            } else {
                res.json(errorCode('ADMIN', 0));
            }
        });
    } catch (error) {
        res.status(401).json({ code: 2, msg: `"unknown error : "${error}` });
    }
});

adminRouter.get('/getSingleGlobalEquipment', authValid, (req, res) => {
    try {
        if (!req.query.id) {
            res.json(errorCode('ADMIN', 1));
            return;
        }
        const Id = req.query.id as string;
        EquipmentController.getByID(Id, true).then((Data) => {
            if (Data) {
                res.status(200).json({
                    code: 200, global_equipment: Data
                });
            } else {
                res.json(errorCode('ADMIN', 0));
            }
        });
    } catch (error) {
        res.status(401).json({ code: 2, msg: `"unknown error : "${error}` });
    }
});

adminRouter.get('/getSingleUserType', authValid, (req, res) => {
    try {
        if (!req.query.id) {
            res.json(errorCode('ADMIN', 1));
            return;
        }
        const Id = req.query.id as string;
        UserTypeController.getByID(Id).then((Data) => {
            if (Data) {
                res.status(200).json({
                    code: 200, user_type: Data
                });
            } else {
                res.json(errorCode('ADMIN', 0));
            }
        });
    } catch (error) {
        res.status(401).json({ code: 2, msg: `"unknown error : "${error}` });
    }
});

adminRouter.get('/getSingleUser', authValid, (req, res) => {
    try {
        if (!req.query.id) {
            res.json(errorCode('ADMIN', 1));
            return;
        }
        const Id = req.query.id as string;
        UserController.getByID(Id).then((Data) => {
            if (Data) {
                res.status(200).json({
                    code: 200, user: Data
                });
            } else {
                res.json(errorCode('ADMIN', 0));
            }
        });
    } catch (error) {
        res.status(401).json({ code: 2, msg: `"unknown error : "${error}` });
    }
});

adminRouter.get('/getSingleNews', authValid, (req, res) => {
    try {
        if (!req.query.id) {
            res.json(errorCode('ADMIN', 1));
            return;
        }
        const Id = req.query.id as string;
        NewsController.getByID(Id).then((Data) => {
            if (Data) {
                res.status(200).json({
                    code: 200, news: Data
                });
            } else {
                res.json(errorCode('ADMIN', 0));
            }
        });
    } catch (error) {
        res.status(401).json({ code: 2, msg: `"unknown error : "${error}` });
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
        UserController.getAllUsers(Limit, Offset).then((Data) => {
            if (Data) {
                res.status(200).json({
                    code: 200, users: Data.rows, total_pages: Math.ceil(Data.count / Limit)
                });
            } else {
                res.json(errorCode('ADMIN', 0));
            }
        });
    } catch (error) {
        res.status(401).json({ code: 2, msg: `"unknown error : "${error}` });
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
        UserTypeController.getAllUserTypes(Limit, Offset).then((Data) => {
            if (Data) {
                res.status(200).json({
                    code: 200, user_types: Data.rows, totalpages: Math.ceil(Data.count / Limit)
                });
            } else {
                res.json(errorCode('ADMIN', 0));
            }
        });
    } catch (error) {
        res.status(401).json({ code: 2, msg: `"unknown error : "${error}` });
    }
});

export default adminRouter;




