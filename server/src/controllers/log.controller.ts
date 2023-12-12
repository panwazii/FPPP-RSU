import LogModel, { LogAttribute } from "../database/models/logs.model";
import { Op } from 'sequelize';

class LogController {

    public static async getAllByUUID(uuid: string) {
        return LogModel.findAll({
            where: { uuid: uuid },
            raw: true
        });
    }

    // public static async getAll(type: string,) {
    //     if (type !== '') {
    //         return LogModel.findAll({
    //             where: {
    //                 type: {
    //                     [Op.iLike]: '%' + searchValue + '%'
    //                 },
    //             },
    //             raw: true
    //         });
    //     }
    //     return LogModel.findAll({
    //         raw: true
    //     });
    // }

    public static async create(data: any) {

        const packet: LogAttribute = {
            type: data.type,
            uuid: data.uuid,
            fname: data.fname,
            lname: data.lname,
            ip: data.ip,
            route: data.route,
            method: data.method,
            body: data.body,
            params: data.params
        };

        return LogModel.create(packet)
    }

}

export default LogController;
