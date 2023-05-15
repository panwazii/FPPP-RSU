import Sequelize, { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import AdminModel from '../database/models/admins.model';
import config from '../config/global.config';
import { log } from '../tools/log';

class AdminController {
    public static async createSuperAdmin() {
        const Email = config.security.superadminemail
        const HashedPassword = await bcrypt.hash(config.security.superadminpassword, 12);
        const Packet = {
            email: Email,
            password: HashedPassword,
            type_id: 1
        };

        return AdminModel.create(Packet)
            .then((res) => log("SuperAdmin has been created"))
            .catch((e) => {
                log(e);
                return false;
            });
    }

    public static async getByUserID(adminId: string) {
        return AdminModel.findOne({
            where: {
                id: adminId,
            },
        });
    }

    public static async getByEmail(email: string) {
        return AdminModel.findOne({
            where: {
                email: email,
            },
        });
    }


    public static async auth(email: string, password: string) {
        const data = await AdminController.getByEmail(email);

        if (data === undefined || data === null) return { code: 401, desc_code: 'email-not-found' };

        const valid = bcrypt.compareSync(password, data.password);
        if (valid) {
            const userInfo = await AdminController.getByUserID(data.id);
            return {
                code: 200,
                data: userInfo,
            };
        }

        return { code: 401, desc_code: 'password-incorrect' };
    }
}

export default AdminController;
