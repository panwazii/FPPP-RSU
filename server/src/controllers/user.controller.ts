import Sequelize, { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel, { UserAttribute } from '../database/models/users.model';
import UserTypeModel from '../database/models/user_types.model';
import config from '../config/global.config';
import { log } from '../tools/log';

class UserController {
    public static readonly EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    public static async getAllUsers(limit: number, offset: number) {
        return UserModel.findAndCountAll({
            limit,
            offset,
            raw: true
        });
    }

    public static async getUserByQuery(options: any) {
        log(options);
        const orderBy = [
            [Sequelize.literal('username'), 'ASC'],
        ];

        const toWhere: any = {
            status: {
                [Op.ne]: -1,
            },
        };
        if (options.search) {
            toWhere.username = {
                [Op.like]: `%${options.search}%`,
            };
        }
        const packet: any = {
            where: toWhere,
            order: orderBy,
        };

        if (options.limit && !Number.isNaN(Number(options.limit))) {
            packet.limit = Number(options.limit);
        }

        if (options.offset && !Number.isNaN(Number(options.offset))) {
            packet.offset = Number(options.offset);
        }

        return UserModel.findAndCountAll(packet);
    }

    public static async getByID(userID: string) {
        return UserModel.findOne({
            where: {
                id: userID,
            },
            include: [{
                model: UserTypeModel, as: 'user_type'
            }],
        });
    }

    public static async getByEmail(email: string) {
        return UserModel.findOne({
            where: {
                email,
                available_status: true
            },
            raw: true,
        });
    }

    public static async destroyUser(userID: string) {
        return UserModel.destroy({
            where: {
                id: userID,
            },
        }).then((rowDeleted) => rowDeleted > 0);
    }

    public static async safeDestroyUser(userID: string) {
        return UserModel.update({
            available_status: false,
        }, {
            where: {
                id: userID,
            },
        }).then(() => true).catch(() => false);
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
        const Decode = UserController.verifyJWT(token) as JwtPayload
        if (Decode.verify) {
            const UserId = Decode.result.id
            const userInfo = await UserController.getByID(UserId);
            return {
                code: 200,
                user: userInfo,
                admin: false
            };
        }
        return null;
    }

    public static async auth(email: string, password: string) {
        const data = await UserController.getByEmail(email);

        if (data === undefined || data === null) return { code: 401, desc_code: 'email-not-found' };

        const valid = bcrypt.compareSync(password, data.password);
        if (valid) {
            const userInfo = await UserController.getByID(data.id);
            return {
                code: 200,
                user: userInfo,
                admin: false
            };
        }

        return { code: 401, desc_code: 'password-incorrect' };
    }

    public static async register(data: any) {
        if (!UserController.EMAIL_REGEX.test(data.email)) {
            return false;
        }

        const password_hash = await bcrypt.hash(data.password, 10);
        const packet = {
            fname: data.fname,
            lname: data.lname,
            type_id: data.type_id,
            password: password_hash,
            email: data.email,
            avatar: data.avatar,
            tel: data.tel,
            booking_permission: 'NONE',
        };

        return UserModel.create(packet)
    }

    public static async update(id: string, data: UserAttribute) {
        return UserModel.update(
            data
            , {
                where: {
                    id
                },
            })
    }

    public static async resetPassword(userID: string, oldPass: string, newPass: string) {
        const user = await UserController.getByID(userID);
        if (!user) {
            return false;
        }

        const valid = bcrypt.compareSync(oldPass, user.password);
        if (!valid) {
            return false;
        }

        return UserModel.update({ password: newPass }, { where: { id: userID } });
    }

    public static async countUsers() {
        return UserModel.count();
    }
}

export default UserController;
