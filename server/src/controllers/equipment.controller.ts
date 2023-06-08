import Sequelize, { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import EquipmentModel,{EquipmentAttribute} from '../database/models/equipments.model';
import GlobalEquipmentModel,{GlobalEquipmentAttribute} from '../database/models/global_equipments.model';
import config from '../config/global.config';
import { log } from '../tools/log';

class EquipmentController {
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
// EQUIPMENT
    public static async getByID(equipmentId: string) {
        return EquipmentModel.findOne({
            where: {
                id: equipmentId,
            },
            raw: true
        });
    }

    public static async getAllEquipment(limit:number,offset:number) {
        return EquipmentModel.findAndCountAll({
            where: { available_status : true  },
            limit,
            offset,
            raw: true
        });
    }

    public static async createEquipment(data: any) {
 
        const packet: EquipmentAttribute = {
            name: data.name,
            details: data.details,
            picture: data.picture,
            price: data.price,
            rent_price: data.rent_price,
            room_id:data.room_id,
            available_status: true,
        };

        return EquipmentModel.create(packet)
            .then(() => true)
            .catch((e) => {
                log(e);
                return false;
            });
    }

    public static async update(data: any) {

        return EquipmentModel.update({
            name: data.name,
            details: data.details,
            picture: data.picture,
            price: data.price,
            rent_price: data.rent_price,
            room_id:data.room_id,
        }, {
            where: {
                id: data.id,
            },
        }).then(() => true)
            .catch(() => false);
    }
// GLOBAL EQUIPMENT
    public static async getByIDGEquip(equipmentId: string) {
        return EquipmentModel.findOne({
            where: {
                id: equipmentId,
            },
            raw: true
        });
    }

    public static async getAllGlobalEquipment(limit:number,offset:number) {
        return GlobalEquipmentModel.findAndCountAll({
            where: { available_status : true  },
            limit,
            offset,
            raw: true
        });
    }

    public static async createGlobalEquipment(data: any) {
 
        const packet: GlobalEquipmentAttribute = {
            name: data.name,
            details: data.details,
            picture: data.picture,
            price: data.price,
            rent_price: data.rent_price,
            available_status: true,
        };

        return GlobalEquipmentModel.create(packet)
            .then(() => true)
            .catch((e) => {
                log(e);
                return false;
            });
    }

    public static async GlobalEquipUpdate(data: any) {

        return GlobalEquipmentModel.update({
            name: data.name,
            details: data.details,
            picture: data.picture,
            price: data.price,
            rent_price: data.rent_price,
        }, {
            where: {
                id: data.id,
            },
        }).then(() => true)
            .catch(() => false);
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

export default EquipmentController;
