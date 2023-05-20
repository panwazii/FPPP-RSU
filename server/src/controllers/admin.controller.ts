import Sequelize, { Op } from 'sequelize';
import bcrypt from 'bcrypt';
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
            fname: "Super",
            lname: "Admin",
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
            raw: true
        });
    }

    public static async getByEmail(email: string) {
        return AdminModel.findOne({
            where: {
                email: email,
            },
            raw: true
        });
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

    public static async authCookie(token: string) {
        const Decode = AdminController.verifyJWT(token);
        if (Decode?.verify) {
            return Decode.result;
        }
        return null;
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
                admin: true
            };
        }

        return { code: 401, desc_code: 'password-incorrect' };
    }
}

export default AdminController;
