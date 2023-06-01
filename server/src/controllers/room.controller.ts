import Sequelize, { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import RoomModel,{RoomAttribute} from '../database/models/rooms.model';
import config from '../config/global.config';
import { log } from '../tools/log';

class RoomController {
    // public static async createSuperAdmin() {
    //     const Email = config.security.superadminemail
    //     const HashedPassword = await bcrypt.hash(config.security.superadminpassword, 12);
    //     const Packet = {
    //         email: Email,
    //         password: HashedPassword,
    //         fname: "Super",
    //         lname: "Admin",
    //         type_id: 1
    //     };

    //     return NewsModel.create(Packet)
    //         .then((res) => log("SuperAdmin has been created"))
    //         .catch((e) => {
    //             log(e);
    //             return false;
    //         });
    // }

    public static async getByID(roomId: string) {
        return RoomModel.findOne({
            where: {
                id: roomId,
            },
            raw: true
        });
    }

    public static async createRoom(data: any) {
 
        const packet: RoomAttribute = {
            name: data.name,
            details: data.details,
            picture: data.picture,
            rent_price: data.rent_price,
            available_status: true,
        };

        return RoomModel.create(packet)
            .then(() => true)
            .catch((e) => {
                log(e);
                return false;
            });
    }

    public static async update(data: any) {

        return RoomModel.update({
            name: data.name,
            details: data.details,
            picture: data.picture,
            rent_price: data.rent_price,
        }, {
            where: {
                id: data.id,
            },
        }).then(() => true)
            .catch(() => false);
    }

    public static verifyJWT(token: string) {
        try {
            const Verify = jwt.verify(token, config.security.salt)
            if (Verify) {
                return { verify: true, result: Verify }
            }
        } catch (err) {
            return { verify: false, result: null };
        }
    }


    // public static async auth(email: string, password: string) {
    //     const data = await AdminController.getByEmail(email);

    //     if (data === undefined || data === null) return { code: 401, desc_code: 'email-not-found' };

    //     const valid = bcrypt.compareSync(password, data.password);
    //     if (valid) {
    //         const userInfo = await AdminController.getByUserID(data.id);
    //         return {
    //             code: 200,
    //             data: userInfo,
    //             admin: true
    //         };
    //     }

    //     return { code: 401, desc_code: 'password-incorrect' };
    // }
}

export default RoomController;
