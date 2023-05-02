import Sequelize, { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import UserModel, { UserAttribute, UserType } from '../database/models/users.model';
import config from '../config/global.config';
import { log } from '../tools/log';

class UserController {
    public static readonly EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    public static async isGroup(userID: number, groupName: string) {
        const userData = await UserController.getByUserID(userID);
        return userData?.usergroup === groupName;
    }

    public static async isAdmin(userID: number) {
        return UserController.isGroup(userID, UserType.ADMIN);
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

    public static async getByUserID(userID: number) {
        return UserModel.findOne({
            where: {
                user_id: userID,
                status: {
                    [Op.ne]: -1,
                },
            },
        });
    }

    public static async getByEmail(email: string) {
        return UserModel.findOne({
            where: {
                email,
                status: {
                    [Op.ne]: -1,
                },
            },
            raw: true,
        });
    }

    public static async getByUsername(username: string) {
        return UserModel.findOne({
            where: {
                username,
                status: {
                    [Op.ne]: -1,
                },
            },
        });
    }

    public static async destroyUser(userID: number) {
        return UserModel.destroy({
            where: {
                user_id: userID,
            },
        }).then((rowDeleted) => rowDeleted > 0);
    }

    public static async safeDestroyUser(userID: number) {
        return UserModel.update({
            status: -1,
        }, {
            where: {
                user_id: userID,
            },
        }).then(() => true).catch(() => false);
    }

    public static verifyJWT(token: string) {
        try {
            return { verify: true, result: <any>jwt.verify(token, config.security.salt) };
        } catch (err) {
            return { verify: false, result: null };
        }
    }

    public static async authCookie(token: string) {
        const decode = UserController.verifyJWT(token);
        // eslint-disable-next-line max-len
        if (decode.verify && decode.result && decode.result?.user_id && !Number.isNaN(Number(decode.result?.user_id))) {
            return Number(decode.result.user_id);
        }
        return null;
    }

    public static async auth(email: string, password: string) {
        const data = await UserController.getByEmail(email);

        if (data === undefined || data === null) return { code: 401, desc_code: 'email-not-found' };

        const valid = bcrypt.compareSync(password, data.password);
        if (valid) {
            const userInfo = await UserController.getByUserID(data.user_id);
            return {
                code: 200,
                data: userInfo,
            };
        }

        return { code: 401, desc_code: 'password-incorrect' };
    }

    public static async register(data: any) {
        if (!UserController.EMAIL_REGEX.test(data.email)) {
            return false;
        }

        const password_hash = await bcrypt.hash(data.password, 10);

        let usergroup = 'user';
        if (data.usergroup === 'admin' || data.usergroup === 'moderator') {
            usergroup = data.usergroup;
        }
        const packet: UserAttribute = {
            username: data.username,
            password: password_hash,
            email: data.email,
            usergroup,
            steam64: data.steam64,
            steamhex: data.steamhex,
            avatar: data.avatar,
            discord_id: data.discord_id,
            discord_name: data.discord_name,
            user_mobile: data.mobile,
            user_address: data.address,
        };

        return UserModel.create(packet)
            .then(() => true)
            .catch((e) => {
                log(e);
                return false;
            });
    }

    public static async update(userID: number, data: any) {
        log(data);
        let password_hash;

        if (data.password) {
            password_hash = await bcrypt.hash(data.password, 10);
        }

        let usergroup = 'user';
        if (data.usergroup === 'admin' || data.usergroup === 'moderator') {
            usergroup = data.usergroup;
        }

        return UserModel.update({
            username: data.username,
            password: password_hash,
            email: data.email,
            usergroup,
            steam64: data.steam64,
            steamhex: data.steamhex,
            avatar: data.avatar,
            discord_id: data.discord_id,
            discord_name: data.discord_name,
            user_mobile: data.mobile,
            user_address: data.address,
        }, {
            where: {
                user_id: userID,
            },
        }).then(() => true)
            .catch(() => false);
    }

    public static async resetPassword(userID: number, oldPass: string, newPass: string) {
        const user = await UserController.getByUserID(userID);
        if (!user) {
            return false;
        }

        const valid = bcrypt.compareSync(oldPass, user.password);
        if (!valid) {
            return false;
        }

        return UserController.update(userID, { password: newPass });
    }
}

export default UserController;
