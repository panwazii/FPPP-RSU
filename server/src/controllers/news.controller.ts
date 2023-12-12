import { Op } from 'sequelize';
import NewsModel, { NewsAttribute } from '../database/models/news.model';

class NewsController {
    //Public
    public static async getByIDPublic(newsId: string) {
        return NewsModel.findOne({
            where: {
                id: newsId,
                available_status: true
            },
            raw: true
        });
    }

    public static async getAllNewsPublic(searchValue: string, limit: number, offset: number) {
        if (searchValue !== '') {
            return NewsModel.findAndCountAll({
                where: {
                    available_status: true,
                    title: {
                        [Op.iLike]: '%' + searchValue + '%'
                    },
                },
                limit,
                offset,
                raw: true
            });
        }
        else {
            return NewsModel.findAndCountAll({
                where: {
                    available_status: true,
                },
                limit,
                offset,
                raw: true
            });
        }
    }

    //Admin
    public static async getByIDAdmin(newsId: string) {
        return NewsModel.findOne({
            where: {
                id: newsId
            },
            raw: true
        });
    }

    public static async getAllNewsAdmin(searchValue: string, limit: number, offset: number) {
        return NewsModel.findAndCountAll({
            where: {
                title: {
                    [Op.iLike]: '%' + searchValue + '%'
                },
            },
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
