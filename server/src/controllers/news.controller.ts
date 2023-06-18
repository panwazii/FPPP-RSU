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
            .then(() => true)
            .catch((e) => {
                log(e);
                return false;
            });
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
        }).then(() => true)
            .catch(() => false);
    }

    public static verifyJWT(token: string) {
        try {
            const Verify = jwt.verify(token, config.security.salt)
            if (Verify) {
                return { verify: true, result: Verify }
            }
        } catch (err) {
            return { verify: false, result: null };
        }
    }

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
}

export default NewsController;
