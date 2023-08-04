import Sequelize, { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import RoomModel, { RoomAttribute } from '../database/models/rooms.model';
import RoomPictureModel, { RoomPictureAttribute } from '../database/models/room_pictures.model';
import config from '../config/global.config';
import { log } from '../tools/log';

class RoomController {
    public static async getByID(roomId: string) {
        return RoomModel.findAll({
            where: {
                id: roomId,
            },
            include: [{
                model: RoomPictureModel, as: 'Picture'
            }],
        });
    }

    public static async getAllRooms(limit: number, offset: number) {
        return RoomModel.findAndCountAll({
            distinct: true,
            include: [{
                model: RoomPictureModel, as: 'Picture',
            }],
            order: [["name", "ASC"]],
            limit,
            offset,
        });
    }

    public static async getAllRoomsUser(limit: number, offset: number) {
        return RoomModel.findAndCountAll({
            distinct: true,
            where: { available_status: true },
            include: [{
                model: RoomPictureModel, as: 'Picture',
                where: { available_status: true }
            }],
            order: [["name", "ASC"]],
            limit,
            offset,
        });
    }

    public static async createRoom(data: any) {
        const packet: RoomAttribute = {
            name: data.name,
            details: data.details,
            rent_price: data.rent_price,
            available_status: true,
        };

        return RoomModel.create(packet)
            .then((data) => {
                return { state: true, id: data.id }
            })
            .catch((e) => {
                log(e);
                return { state: false, id: null };
            });
    }

    public static async update(data: any) {
        return RoomModel.update({
            name: data.name,
            details: data.details,
            rent_price: data.rent_price,
        }, {
            where: {
                id: data.id,
            },
        }).then(() => true)
            .catch(() => false);
    }

    public static async createRoomPicture(url: string, id: string) {
        const packet: RoomPictureAttribute = {
            url: url,
            room_id: id,
            available_status: true,
        };

        return RoomPictureModel.create(packet)
            .then(() => true)
            .catch((e) => {
                log(e);
                return false;
            });
    }

}

export default RoomController;
