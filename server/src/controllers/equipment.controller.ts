import Sequelize, { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import EquipmentModel, { EquipmentAttribute } from '../database/models/equipments.model';
import GlobalEquipmentModel, { GlobalEquipmentAttribute } from '../database/models/global_equipments.model';
import EquipmentInfoModel, { EquipmentInfoAttribute } from '../database/models/equipment_infos.model';
import EquipmentStockModel, { EquipmentStockAttribute } from '../database/models/equipment_stocks.model';
import EquipmentRentRateModel, { EquipmentRentRateAttribute } from '../database/models/equipment_rent_rates.model';
import ProductionLineModel, { ProductionLineAttribute } from '../database/models/production_lines.model';
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
    public static async getByID(equipmentId: string, global: boolean) {
        if (global === false) {
            return EquipmentModel.findOne({
                where: {
                    id: equipmentId,
                },
                raw: true
            });
        }
        return GlobalEquipmentModel.findOne({
            where: {
                id: equipmentId,
            },
            raw: true
        });

    }

    public static async getAllEquipment(limit: number, offset: number) {
        return EquipmentModel.findAndCountAll({
            where: { available_status: true },
            limit,
            offset,
            raw: true
        });
    }

    public static async getAllEquipmentByRoom(id: string, limit: number, offset: number) {
        return EquipmentModel.findAndCountAll({
            where: { room_id: id, available_status: true },
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
            room_id: data.room_id,
            available_status: true,
        };

        return EquipmentModel.create(packet)
            .then(() => true)
            .catch((e) => {
                log(e);
                return false;
            });
    }

    public static async updateEquipment(data: any, global: boolean) {
        if (global === false) {
            return EquipmentModel.update({
                name: data.name,
                details: data.details,
                picture: data.picture,
                price: data.price,
                rent_price: data.rent_price,
                room_id: data.room_id,
            }, {
                where: {
                    id: data.id,
                },
            })
        }
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
        })

    }

    public static async getAllGlobalEquipment(limit: number, offset: number) {
        return GlobalEquipmentModel.findAndCountAll({
            where: { available_status: true },
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

    // public static async GlobalEquipUpdate(data: any) {

    //     return GlobalEquipmentModel.update({
    //         name: data.name,
    //         details: data.details,
    //         picture: data.picture,
    //         price: data.price,
    //         rent_price: data.rent_price,
    //     }, {
    //         where: {
    //             id: data.id,
    //         },
    //     }).then(() => true)
    //         .catch(() => false);
    // }

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

    // New equipment controller

    // Equipment Info

    public static async getSingleEquipmentInfo(id: string) {
        return EquipmentInfoModel.findOne({
            where: { id: id },
            raw: true
        });
    }

    public static async getAllEquipmentInfo(limit: number, offset: number) {
        return EquipmentInfoModel.findAndCountAll({
            where: { available_status: true },
            limit,
            offset,
            raw: true
        });
    }

    public static async getAllEquipmentInfoInRoom(id: string, limit: number, offset: number) {
        return EquipmentInfoModel.findAndCountAll({
            distinct: true,
            where: { available_status: true },
            include: [{
                model: EquipmentStockModel, as: 'Stock',
                where: { room_id: id, available_status: true, },
            }],
            limit,
            offset,

        });
    }

    public static async createEquipmentInfo(data: any) {
        const packet: EquipmentInfoAttribute = {
            name: data.name,
            details: data.details,
            picture: data.picture,
            price: data.price,
            rent_price: data.rent_price,
            available_status: true,
        };

        return EquipmentInfoModel.create(packet)
            .then(() => true)
            .catch((e) => {
                log(e);
                return false;
            });
    }

    public static async updateEquipmentInfo(data: any) {
        return EquipmentInfoModel.update({
            name: data.name,
            details: data.details,
            picture: data.picture,
            price: data.price,
            rent_price: data.rent_price,
        }, {
            where: {
                id: data.id,
            },
        })
    }

    // Equipment Stock
    public static async getSingleEquipmentStock(id: string) {
        return EquipmentStockModel.findOne({
            where: { id: id },
            raw: true
        });
    }

    public static async getAllEquipmentStock(limit: number, offset: number) {
        return EquipmentStockModel.findAndCountAll({
            where: { available_status: true },
            limit,
            offset,
            raw: true
        });
    }

    public static async createEquipmentStock(data: any) {
        const packet: EquipmentStockAttribute = {
            serial_number: data.serial_number,
            room_id: data.room_id,
            equipment_info_id: data.equipment_info_id,
            equipment_status: "available",
            available_status: true,
        };

        return EquipmentStockModel.create(packet)
            .then(() => true)
            .catch((e) => {
                log(e);
                return false;
            });
    }

    public static async updateEquipmentStock(data: any) {
        return EquipmentStockModel.update({
            serial_number: data.serial_number,
            room_id: data.room_id,
        }, {
            where: {
                id: data.id,
            },
        })
    }

    // Equipment Rent Rate
    public static async getSingleEquipmentRentRate(id: string) {
        return EquipmentRentRateModel.findOne({
            where: { id: id },
            raw: true
        });
    }

    public static async getAllEquipmentRentRate(limit: number, offset: number) {
        return EquipmentRentRateModel.findAndCountAll({
            where: { available_status: true },
            limit,
            offset,
            raw: true
        });
    }

    public static async createEquipmentRentRate(data: any) {
        const packet: EquipmentRentRateAttribute = {
            name: data.name,
            available_status: true,
        };

        return EquipmentRentRateModel.create(packet)
            .then(() => true)
            .catch((e) => {
                log(e);
                return false;
            });
    }

    public static async updateEquipmentRentRate(data: any) {
        return EquipmentRentRateModel.update({
            name: data.name,
        }, {
            where: {
                id: data.id,
            },
        })
    }

    // production line
    public static async getSingleProductionLine(id: string) {
        return ProductionLineModel.findOne({
            where: { id: id },
            raw: true
        });
    }

    public static async getAllProductionLine(limit: number, offset: number) {
        return ProductionLineModel.findAndCountAll({
            limit,
            offset,
            raw: true
        });
    }

    public static async createProductionLine(data: any) {
        const packet: ProductionLineAttribute = {
            name: data.name,
            available_status: true,
        };

        return ProductionLineModel.create(packet)
            .then(() => true)
            .catch((e) => {
                log(e);
                return false;
            });
    }

    public static async updateProductionLine(data: any) {
        return ProductionLineModel.update({
            name: data.name,
        }, {
            where: {
                id: data.id,
            },
        })
    }
}

export default EquipmentController;
