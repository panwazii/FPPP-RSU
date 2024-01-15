import ProductionLineModel from '../database/models/production_lines.model';
import EquipmentInfoModel from '../database/models/equipment_infos.model';
import ReserveModel, { ReserveAttribute } from '../database/models/reserve.model';
import ReserveEquipmentModel, { ReserveEquipmentAttribute } from '../database/models/reserve_equipments.model';
import RoomModel from '../database/models/rooms.model';
import { Op } from 'sequelize';
import RoomPictureModel from '../database/models/room_pictures.model';
import QuotationModel, { QuotationAttribute } from '../database/models/quotations.model';
import AdminModel from '../database/models/admins.model';
import UserModel from '../database/models/users.model';
import UserTypeModel from '../database/models/user_types.model';

class ReserveController {
    public static async getSingleReserveAndChildForUser(id: string, userId: string) {
        return ReserveModel.findOne({
            where: {
                id,
                user_id: userId,
                available_status: true
            },
            include: [
                {
                    model: RoomModel, as: 'room',
                    include: [{
                        model: RoomPictureModel, as: 'picture',
                    }]
                },
                {
                    model: ReserveEquipmentModel, as: 'reserve_equipment',
                    include: [{
                        model: EquipmentInfoModel, as: 'equipment_info',
                        include: [{
                            model: ProductionLineModel, as: 'production_line',
                        }]
                    }]
                }],
        });
    }

    public static async getAllReserveAndChildForUser(searchValue: string, id: string, limit: number, offset: number) {
        return ReserveModel.findAndCountAll({
            distinct: true,
            where: {
                user_id: id,
                approval_status: searchValue,
                available_status: true
            },
            include: [
                {
                    model: RoomModel, as: 'room',
                },
                {
                    model: ReserveEquipmentModel, as: 'reserve_equipment',
                }],
            limit,
            offset,
        });
    }

    public static async getSingleReserveAndChild(id: string) {
        return ReserveModel.findOne({
            where: {
                id
            },
            include: [
                {
                    model: UserModel, as: 'user',
                    attributes: { exclude: ['password', 'created_at', 'updated_at'] },
                    include: [{
                        model: UserTypeModel, as: 'user_type',
                    }]
                },
                {
                    model: RoomModel, as: 'room',
                    include: [{
                        model: RoomPictureModel, as: 'picture',
                    }]
                },
                {
                    model: ReserveEquipmentModel, as: 'reserve_equipment',
                    include: [{
                        model: EquipmentInfoModel, as: 'equipment_info',
                        include: [{
                            model: ProductionLineModel, as: 'production_line',
                        }]
                    }]
                }],
        });
    }

    public static async getAllReserveAndChild(searchValue: string, limit: number, offset: number) {
        return ReserveModel.findAndCountAll({
            distinct: true,
            where: {
                approval_status: searchValue,
                available_status: true
            },
            include: [
                {
                    model: UserModel, as: 'user',
                    attributes: { exclude: ['password', 'created_at', 'updated_at'] },
                    include: [{
                        model: UserTypeModel, as: 'user_type',
                    }]
                },
                {
                    model: RoomModel, as: 'room',
                }, {
                    model: ReserveEquipmentModel, as: 'reserve_equipment',
                }
            ],
            limit,
            offset,
        });
    }

    public static async getAllReserveUser(id: string) {
        return ReserveModel.findAll({
            where: {
                user_id: id,
                available_status: true
            },
            raw: true
        });
    }

    public static async getAllReserveAdmin() {
        return ReserveModel.findAll({
            where: {
                available_status: true
            },
            raw: true
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

    public static async update(id: string, data: any) {
        return ReserveModel.update({
            time_start: data.time_start,
            time_end: data.time_end,
            details: data.details,
            approval_status: data.approval_status,
            available_status: data.available_status,
        }, {
            where: {
                id,
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

    public static async getSingleQuotationUser(user_id: string, reserve_id: string) {
        return QuotationModel.findOne({
            where: {
                reserve_id: reserve_id,
            },
            include: [{
                model: ReserveModel,
                where: { user_id: user_id },
                include: [{
                    model: UserModel,
                }, {
                    model: RoomModel, as: 'room',
                }, {
                    model: ReserveEquipmentModel, as: 'reserve_equipment',
                    include: [{ model: EquipmentInfoModel, as: 'equipment_info' }]
                }
                ]
            },
            {
                model: AdminModel
            }
            ]
        });
    }

    public static async getSingleQuotation(id: string) {
        return QuotationModel.findOne({
            where: {
                reserve_id: id,
            },
            include: [{
                model: ReserveModel,
                include: [{
                    model: UserModel,
                }, {
                    model: RoomModel, as: 'room',
                }, {
                    model: ReserveEquipmentModel, as: 'reserve_equipment',
                    include: [{ model: EquipmentInfoModel, as: 'equipment_info' }]
                }
                ]
            },
            {
                model: AdminModel
            }
            ]
        });
    }

    public static async createQuotation(id: string, data: any) {
        const packet: QuotationAttribute = {
            reserve_id: data.reserve_id,
            admin_id: id,
            equipment_price: data.equipment_price,
            room_price: data.room_price,
        };
        return QuotationModel.create(packet)
    }

    public static async updateQuotation(id: string, data: any) {
        return QuotationModel.update({
            reserve_id: data.reserve_id,
            admin_id: id,
            equipment_price: data.equipment_price,
            room_price: data.room_price,
        }, {
            where: {
                id: data.id,
            },
        })
    }

    public static async deleteQuotationByReserveId(id: string) {
        return QuotationModel.destroy({
            where: {
                reserve_id: id,
            }
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
