import Sequelize, { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import UserModel, { UserAttribute } from '../database/models/users.model';
import ReserveModel, { ReserveAttribute } from '../database/models/reserve.model';
import ReserveEquipmentModel, { ReserveEquipmentAttribute } from '../database/models/reserve_equipments.model';
import config from '../config/global.config';
import { log } from '../tools/log';

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

    public static async getAllReserveAndChildForUser(id: string, limit: number, offset: number) {
        return ReserveModel.findAndCountAll({
            distinct: true,
            where: { user_id: id, available_status: true },
            include: [{
                model: ReserveEquipmentModel,
            }],
            limit,
            offset,

        });
    }

    public static async getAllReserveAndChild(id: string, limit: number, offset: number) {
        return ReserveModel.findAndCountAll({
            distinct: true,
            where: { available_status: true },
            include: [{
                model: ReserveEquipmentModel,
                where: { room_id: id, available_status: true, },
            }],
            limit,
            offset,

        });
    }

    public static async createReserve(data: any) {
        const packet: ReserveAttribute = {
            user_id: data.user_id,
            room_id: data.room_id,
            time_start: data.time_start,
            time_end: data.time_end,
            details: data.details,
            approval_status: false,
            available_status: true,
        };
        return ReserveModel.create(packet)
            .then((data) => {
                return { state: true, id: data.id }

            })
            .catch((e) => {
                return { state: false, id: null };
            });
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
        }).then(() => true)
            .catch(() => false);
    }

    // reserve equipment
    public static async getReserveEquipmentByID(id: string) {
        return ReserveEquipmentModel.findOne({
            where: {
                id: id,
            },
            raw: true
        });
    }

    public static async getAllReserveEquipment(id: string, limit: number, offset: number) {
        return ReserveEquipmentModel.findAndCountAll({
            where: { available_status: true },
            limit,
            offset,
            raw: true

        });
    }

    public static async createReserveEquipment(id: any, data: any) {
        const packet: ReserveEquipmentAttribute = {
            equipment_info_id: data.equipment_info_id,
            equipment_stock_id: data.equipment_stock_id,
            reserve_id: id,
            available_status: true,
        };

        return ReserveEquipmentModel.create(packet)
            .then(() => true)
            .catch((e) => {
                log(e);
                return false;
            });
    }

    public static async updateReserveEquipment(data: any) {
        return ReserveEquipmentModel.update({
            equipment_info_id: data.equipment_info_id,
            equipment_stock_id: data.equipment_stock_id,
            available_status: data.available_status,
        }, {
            where: {
                id: data.id,
            },
        }).then(() => true)
            .catch(() => false);
    }
}



export default ReserveController;
