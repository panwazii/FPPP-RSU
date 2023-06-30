import Sequelize, { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import RoomModel,{RoomAttribute} from '../database/models/rooms.model';
import config from '../config/global.config';
import { log } from '../tools/log';

class RoomController {
    public static async getByID(roomId: string) {
        return RoomModel.findOne({
            where: {
                id: roomId,
            },
            raw: true
        });
    }

    public static async getAllRooms(limit:number,offset:number) {
        return RoomModel.findAndCountAll({
            where: { available_status : true  },
            order: [["name", "ASC"]],
            limit,
            offset,
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

}

export default RoomController;
