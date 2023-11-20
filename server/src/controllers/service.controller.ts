import Sequelize, { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import ServiceModel, { ServiceAttribute } from '../database/models/services.model';
import { log } from '../tools/log';


class ServiceController {
    public static async getByID(id: string) {
        return ServiceModel.findOne({
            where: {
                id: id,
            },
            raw: true
        });
    }

    public static async getAll(limit: number, offset: number) {
        return ServiceModel.findAndCountAll({
            limit,
            offset,
            raw: true
        });
    }

    public static async getAllShow(limit: number, offset: number) {
        return ServiceModel.findAndCountAll({
            where: {
                available_status: true,
            },
            limit,
            offset,
            raw: true
        });
    }

    public static async create(data: any) {

        const packet: ServiceAttribute = {
            id: data.id,
            title: data.title,
            details: data.details,
            picture: data.picture,
            available_status: true,
        };

        return ServiceModel.create(packet)
    }

    public static async update(data: any) {

        return ServiceModel.update({
            title: data.title,
            details: data.details,
            picture: data.picture,
            available_status: data.available_status,
        }, {
            where: {
                id: data.id,
            },
        })
    }

}

export default ServiceController;
