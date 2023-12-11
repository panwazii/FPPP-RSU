import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AdminModel from '../database/models/admins.model';
import config from '../config/global.config';
import { log } from '../tools/log';

class AdminController {
    public static async createAdmin(data: any) {
        const HashedPassword = await bcrypt.hash(data.password, 12);
        const Packet = {
            email: data.email,
            password: HashedPassword,
            fname: data.fname,
            lname: data.lname,
            tel: data.tel,
            type: 'ADMIN'
        };

        return AdminModel.create(Packet)
            .then((res) => log("Admin has been created"))
            .catch((e) => {
                log(e);
                return false;
            });
    }

    public static async getByID(adminId: string) {
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
        interface JwtPayload {
            [key: string]: any;
            verify: boolean
        }
        const Decode = AdminController.verifyJWT(token) as JwtPayload
        if (Decode.verify) {
            const UserId = Decode.result.id
            const userInfo = await AdminController.getByID(UserId);
            return {
                code: 200,
                user: userInfo,
                admin: false
            };
        }
        return null;
    }

    public static async auth(email: string, password: string) {
        const data = await AdminController.getByEmail(email);

        if (data === undefined || data === null) return { code: 401, desc_code: 'email-not-found' };

        const valid = bcrypt.compareSync(password, data.password);
        if (valid) {
            const userInfo = await AdminController.getByID(data.id);
            return {
                code: 200,
                user: userInfo,
                admin: true
            };
        }

        return { code: 401, desc_code: 'password-incorrect' };
    }
}

export default AdminController;
