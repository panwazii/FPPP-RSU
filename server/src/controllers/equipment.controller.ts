import Sequelize, { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import EquipmentInfoModel, { EquipmentInfoAttribute } from '../database/models/equipment_infos.model';
import EquipmentsModel, { EquipmentsAttribute } from '../database/models/equipments.model';
import RentRate, { RentRateAttribute } from '../database/models/rent_rate.model';
import ProductionLineModel, { ProductionLineAttribute } from '../database/models/production_lines.model';
import SupplierModel, { SupplierAttribute } from '../database/models/supplier.model';
import SupplyModel, { SupplyAttribute } from '../database/models/supply.model';
import config from '../config/global.config';
import { log } from '../tools/log';

class EquipmentController {

    // Equipment Info
    public static async getSingleEquipmentInfo(id: string) {
        return EquipmentInfoModel.findOne({
            where: { id: id },
            raw: true
        });
    }

    public static async getAllEquipmentInfo(filterType: number, searchValue: string, limit: number, offset: number) {
        if (searchValue !== '' && filterType === 1) {
            return EquipmentInfoModel.findAndCountAll({
                where: {
                    available_status: true,
                    name: {
                        [Op.iLike]: '%' + searchValue + '%'
                    }
                },
                limit,
                offset,
                raw: true
            });
        }
        else if (searchValue !== '' && filterType === 2) {
            return EquipmentInfoModel.findAndCountAll({
                where: { available_status: true },
                limit,
                offset,
                raw: true
            });
        }
        else {
            return EquipmentInfoModel.findAndCountAll({
                where: { available_status: true },
                limit,
                offset,
                raw: true
            });
        }
    }

    public static async getAllEquipmentInfoInRoom(id: string, limit: number, offset: number) {
        return EquipmentInfoModel.findAndCountAll({
            distinct: true,
            where: { available_status: true },
            include: [{
                model: EquipmentsModel, as: 'stock',
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
            average_price: data.price,
            rent_price: data.rent_price,
            quantity: data.quantity,
            type: data.type,
            available_status: true,
        };

        return EquipmentInfoModel.create(packet)
    }

    public static async updateEquipmentInfo(data: any) {
        return EquipmentInfoModel.update({
            name: data.name,
            details: data.details,
            picture: data.picture,
            average_price: data.price,
            rent_price: data.rent_price,
            quantity: data.quantity,
            type: data.type,
            rent_rate_id: data.rent_rate_id,
            production_line_id: data.production_line_id,
        }, {
            where: {
                id: data.id,
            },
        })
    }

    // Equipment Stock
    public static async getSingleEquipmentStock(id: string) {
        return EquipmentsModel.findOne({
            where: { id: id },
            raw: true
        });
    }

    public static async getAllEquipmentStock(limit: number, offset: number) {
        return EquipmentsModel.findAndCountAll({
            where: { available_status: true },
            limit,
            offset,
            raw: true
        });
    }

    public static async createEquipmentStock(data: any) {
        const packet: EquipmentsAttribute = {
            serial_number: data.serial_number,
            room_id: data.room_id,
            price: data.price,
            equipment_info_id: data.equipment_info_id,
            equipment_status: "available",
            available_status: true,
        };

        return EquipmentsModel.create(packet)
    }

    public static async updateEquipmentStock(data: any) {
        return EquipmentsModel.update({
            serial_number: data.serial_number,
            room_id: data.room_id,
            price: data.price,
        }, {
            where: {
                id: data.id,
            },
        })
    }

    // Equipment Rent Rate
    public static async getSingleEquipmentRentRate(id: string) {
        return RentRate.findOne({
            where: { id: id },
            raw: true
        });
    }

    public static async getAllEquipmentRentRate(limit: number, offset: number) {
        return RentRate.findAndCountAll({
            where: { available_status: true },
            limit,
            offset,
            raw: true
        });
    }

    public static async createEquipmentRentRate(data: any) {
        const packet: RentRateAttribute = {
            name: data.name,
            available_status: true,
        };

        return RentRate.create(packet)
    }

    public static async updateEquipmentRentRate(data: any) {
        return RentRate.update({
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

    //Supply
    public static async getSingleSupplyStock(id: number) {
        return SupplyModel.findOne({
            where: { id: id },
            raw: true
        });
    }

    public static async getAllSupplyStock(limit: number, offset: number) {
        return SupplyModel.findAndCountAll({
            where: { available_status: true },
            limit,
            offset,
            raw: true
        });
    }

    public static async createSupplyStock(data: any) {
        const packet: SupplyAttribute = {
            quantity: data.quantity,
            price: data.price,
            date: data.date,
            remark: data.remark,
            equipment_info_id: data.equipment_info_id,
            supplier_id: data.supplier_id,
            available_status: true,
        };

        return SupplyModel.create(packet)
    }

    public static async updateSupplyStock(data: any) {
        return SupplyModel.update({
            quantity: data.quantity,
            price: data.price,
            date: data.date,
            remark: data.remark,
            equipment_info_id: data.equipment_info_id,
            supplier_id: data.supplier_id,
        }, {
            where: {
                id: data.id,
            },
        })
    }

    //Supplier
    public static async getSingleSupplier(id: number) {
        return SupplierModel.findOne({
            where: { id: id },
            raw: true
        });
    }

    public static async getAllSupplier(limit: number, offset: number) {
        return SupplierModel.findAndCountAll({
            where: { available_status: true },
            limit,
            offset,
            raw: true
        });
    }

    public static async createSupplier(data: any) {
        const packet: SupplierAttribute = {
            name: data.name,
            contact_info: data.contact_info,
            available_status: true,
        };

        return SupplierModel.create(packet)
    }

    public static async updateSupplier(data: any) {
        return SupplierModel.update({
            name: data.name,
            contact_info: data.contact_info,
        }, {
            where: {
                id: data.id,
            },
        })
    }

    //Drop down
    public static async getDropdownProductionLine() {
        return ProductionLineModel.findAll({
            attributes: { include: ['id', 'name'] },
            raw: true
        });
    }

    public static async getDropdownEquipmentInfo() {
        return EquipmentInfoModel.findAll({
            attributes: { include: ['id', 'name', 'picture'] },
            raw: true
        });
    }

    public static async getDropdownRentRate() {
        return RentRate.findAll({
            attributes: { include: ['id', 'name'] },
            raw: true
        });
    }
}

export default EquipmentController;
