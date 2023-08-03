import Sequelize, { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import WebInfoModel, { WebInfoAttribute } from '../database/models/web_info.model';
import { log } from '../tools/log';


class WebInfoController {
    public static async getByID(id: string) {
        return WebInfoModel.findOne({
            where: {
                id: id,
            },
            raw: true
        });
    }

    public static async getAll(limit: number, offset: number) {
        return WebInfoModel.findAndCountAll({
            limit,
            offset,
            raw: true
        });
    }

    public static async create(data: any) {

        const packet: WebInfoAttribute = {
            id: data.id,
            details: data.details,
            email: data.email,
            tel: data.tel,
            location: data.location,
        };

        return WebInfoModel.create(packet)
            .then(() => true)
            .catch((e) => {
                log(e);
                return false;
            });
    }

    public static async update(data: any) {

        return WebInfoModel.update({
            details: data.details,
            email: data.email,
            tel: data.tel,
            location: data.location,
            picture_name: data.name,
            picture_url: data.url,

        }, {
            where: {
                id: data.id,
            },
        }).then(() => true)
            .catch(() => false);
    }

}

export default WebInfoController;
