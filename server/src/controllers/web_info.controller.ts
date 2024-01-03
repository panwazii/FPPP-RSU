import WebInfoModel, { WebInfoAttribute } from '../database/models/web_info.model';

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
            logo: data.logo,
            banner_picture: data.banner_picture,
            banner_title: data.banner_title,
            about_picture: data.about_picture,
            about_title: data.about_title,
            about_details: data.about_details,
            service_title: data.service_title,
            service_details: data.service_details,
            contact_email: data.contact_email,
            contact_description: data.contact_description,
            contact_tel: data.contact_tel,
            contact_address: data.contact_address,
            contact_location: data.contact_location,
        };

        return WebInfoModel.create(packet)
    }

    public static async update(data: any) {
        return WebInfoModel.update({
            logo: data.logo,
            banner_picture: data.banner_picture,
            banner_title: data.banner_title,
            about_picture: data.about_picture,
            about_title: data.about_title,
            about_details: data.about_details,
            service_title: data.service_title,
            service_details: data.service_details,
            contact_email: data.contact_email,
            contact_description: data.contact_description,
            contact_tel: data.contact_tel,
            contact_address: data.contact_address,
            contact_location: data.contact_location,

        }, {
            where: {
                id: data.id,
            },
        })
    }

    public static async updateTab1(title: string, content: string, picture: string) {
        return WebInfoModel.update({
            tab_1_title: title,
            tab_1_content: content,
            tab_1_picture: picture,
        }, {
            where: {
                id: 1,
            },
        })
    }

    public static async updateTab2(title: string, content: string, picture: string) {
        return WebInfoModel.update({
            tab_2_title: title,
            tab_2_content: content,
            tab_2_picture: picture,
        }, {
            where: {
                id: 1,
            },
        })
    }

    public static async getTab1() {
        return WebInfoModel.findOne({
            where: {
                id: 1,
            },
            attributes: ['tab_1_title', 'tab_1_content', 'tab_1_picture'],
            raw: true
        });
    }

    public static async getTab2() {
        return WebInfoModel.findOne({
            where: {
                id: 1,
            },
            attributes: ['tab_2_title', 'tab_2_content', 'tab_2_picture'],
            raw: true
        });
    }

}

export default WebInfoController;
