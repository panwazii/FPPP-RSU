import ReserveModel, { ReserveAttribute } from '../database/models/reserve.model';
import ReserveEquipmentModel, { ReserveEquipmentAttribute } from '../database/models/reserve_equipments.model';
import { Op } from 'sequelize';

class ReserveController {
    public static async getReserveByID(id: string) {
        return ReserveModel.findOne({
            where: {
                id: id,
            },
            include: [{
                model: ReserveEquipmentModel,
                where: { room_id: id }
            }],
        });
    }

    public static async getAllReserveAndChildForUser(searchValue: string, id: string, limit: number, offset: number) {
        return ReserveModel.findAndCountAll({
            distinct: true,
            where: {
                user_id: id,
                approval_status: { [Op.like]: '%' + searchValue + '%' },
                available_status: true
            },
            include: [{
                model: ReserveEquipmentModel,
            }],
            limit,
            offset,
        });
    }

    public static async getAllReserveAndChild(searchValue: string, limit: number, offset: number) {
        return ReserveModel.findAndCountAll({
            distinct: true,
            where: {
                approval_status: { [Op.like]: '%' + searchValue + '%' },
                available_status: true
            },
            include: [{
                model: ReserveEquipmentModel,
                where: { available_status: true },
            }],
            limit,
            offset,

        });
    }

    public static async createReserve(data: any) {
        const packet: ReserveAttribute = {
            user_id: data.credentials.id,
            room_id: data.room_id,
            time_start: data.time_start,
            time_end: data.time_end,
            details: data.details,
            approval_status: 'WAITING',
            available_status: true,
        };
        return ReserveModel.create(packet)
    }

    public static async update(data: any) {
        return ReserveModel.update({
            time_start: data.time_start,
            time_end: data.time_end,
            details: data.details,
            approval_status: data.approval_status,
            available_status: data.available_status,
        }, {
            where: {
                id: data.id,
            },
        })
    }

    public static async createReserveEquipment(id: string, data: any) {
        const packet: ReserveEquipmentAttribute = {
            equipment_info_id: data.id,
            equipments_id: data.equipments_id,
            reserve_id: id,
            quantity: data.quantity,
            available_status: true,
        };

        return ReserveEquipmentModel.create(packet)
    }

    public static async updateReserveEquipment(data: any) {
        return ReserveEquipmentModel.update({
            equipment_info_id: data.equipment_info_id,
            equipments_id: data.equipments_id,
            quantity: data.quantity,
            available_status: data.available_status,
        }, {
            where: {
                id: data.id,
            },
        })
    }

    // reserve equipment
    // public static async getReserveEquipmentByID(id: string) {
    //     return ReserveEquipmentOnlyModel.findOne({
    //         where: {
    //             id: id,
    //         },
    //         raw: true
    //     });
    // }

    // public static async getAllReserveEquipment(limit: number, offset: number) {
    //     return ReserveEquipmentOnlyModel.findAndCountAll({
    //         where: { available_status: true },
    //         limit,
    //         offset,
    //         raw: true

    //     });
    // }

    // public static async getAllReserveEquipmentUser(id: string, limit: number, offset: number) {
    //     return ReserveEquipmentOnlyModel.findAndCountAll({
    //         where: { user_id: id, available_status: true },
    //         limit,
    //         offset,
    //         raw: true

    //     });
    // }

    // public static async createReserveEquipmentOnly(data: ReserveEquipmentOnlyAttribute) {
    //     const packet: ReserveEquipmentOnlyAttribute = {
    //         user_id: data.user_id,
    //         equipment_info_id: data.equipment_info_id,
    //         equipments_id: data.equipments_id,
    //         time_start: data.time_start,
    //         time_end: data.time_end,
    //         quantity: data.quantity,
    //         available_status: true,
    //     };

    //     return ReserveEquipmentOnlyModel.create(packet)
    // }

    // public static async updateReserveEquipmentOnly(data: any) {
    //     return ReserveEquipmentOnlyModel.update({
    //         equipment_info_id: data.equipment_info_id,
    //         equipments_id: data.equipments_id,
    //         time_start: data.time_start,
    //         time_end: data.time_end,
    //         quantity: data.quantity,
    //         available_status: data.available_status,
    //     }, 
    //         where: {
    //             id: data.id,
    //         },
    //     })
    // }
}

export default ReserveController;
