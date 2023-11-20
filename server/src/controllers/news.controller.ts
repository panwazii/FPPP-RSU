import Sequelize, { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import NewsModel, { NewsAttribute } from '../database/models/news.model';
import config from '../config/global.config';
import { log } from '../tools/log';


class NewsController {
    public static async getByID(newsId: string) {
        return NewsModel.findOne({
            where: {
                id: newsId,
            },
            raw: true
        });
    }

    public static async getAllNews(limit: number, offset: number) {
        return NewsModel.findAndCountAll({
            where: { available_status: true },
            limit,
            offset,
            raw: true
        });
    }

    public static async createNews(data: any) {

        const packet: NewsAttribute = {
            title: data.title,
            details: data.details,
            picture: data.picture,
            available_status: true,
        };

        return NewsModel.create(packet)
    }

    public static async update(data: any) {
        return NewsModel.update({
            title: data.title,
            details: data.details,
            picture: data.picture,
        }, {
            where: {
                id: data.id,
            },
        })
    }
}

export default NewsController;
