import Sequelize, { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import SuperAdminModel from '../database/models/super_admins.model';
import config from '../config/global.config';
import { log } from '../tools/log';

class SuperAdminController {
    public static async createSuperAdmin() {
        const Username = config.security.superadminusername
        const HashedPassword = await bcrypt.hash(config.security.superadminpassword, 12);
        const Packet = {
            username: Username,
            password: HashedPassword,
        };

        return SuperAdminModel.create(Packet)
            .then((res) => log("SuperAdmin has been created"))
            .catch((e) => {
                log(e);
                return false;
            });
    }

    public static async getByUserID(adminId: number) {
        return SuperAdminModel.findOne({
            where: {
                id: adminId,
            },
        });
    }

    public static async getByUsername(username: string) {
        return SuperAdminModel.findOne({
            where: {
                username: username,
            },
        });
    }

    public static async auth(username: string, password: string) {
        const data = await SuperAdminController.getByUsername(username);

        if (data === undefined || data === null) return { code: 401, desc_code: 'email-not-found' };

        const valid = bcrypt.compareSync(password, data.password);
        if (valid) {
            const userInfo = await SuperAdminController.getByUserID(data.id);
            return {
                code: 200,
                data: userInfo,
            };
        }

        return { code: 401, desc_code: 'password-incorrect' };
    }
}

export default SuperAdminController;
