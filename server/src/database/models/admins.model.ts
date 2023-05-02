import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';

export interface UserAttribute {
    user_id?: number;
    username?: string;
    email?: string;
    password?: string;
    usergroup?: string;

    // Meta
    user_address?: string;
    user_mobile?: string;
    steam64?: string;
    discord_id?: string;
    discord_name?: string;
    steamhex?: string;
    avatar?: string;
    coin?: number;
    status?: number;
    joined_date?: Date;
    latest_date?: Date;
}

export interface UserAttributeCreation extends Optional<UserAttribute, 'user_id'> { }

export const UserType = {
    USER: 'user',
    MODERATOR: 'moderator',
    ADMIN: 'admin',
};

class UserModel extends Model<UserAttribute, UserAttributeCreation> implements UserAttribute {
    public user_id!: number;

    public username!: string;

    public email!: string;

    public password!: string;

    public usergroup!: string;

    // Meta
    public user_address!: string;

    public user_mobile!: string;

    public discord_id!: string;

    public discord_name!: string;

    public steam64!: string;

    public steamhex!: string;

    public avatar!: string;

    public coin!: number;

    public status!: number;

    public joined_date!: Date;

    public latest_date!: Date;
}

export const initUserModel = (connection: Sequelize) => {
    UserModel.init(
        {
            user_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            username: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },
            email: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },
            password: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            usergroup: {
                allowNull: false,
                type: DataTypes.ENUM('user', 'moderator', 'admin'),
            },
            user_address: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            user_mobile: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            discord_name: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true,
            },
            discord_id: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true,
            },
            steam64: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true,
            },
            steamhex: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true,
            },
            avatar: {
                allowNull: false,
                type: DataTypes.STRING(500),
            },
            coin: {
                allowNull: false,
                type: DataTypes.DOUBLE,
                defaultValue: 0,
            },
            status: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1,
            },
            joined_date: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            latest_date: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize: connection,
            timestamps: false,
            tableName: 'user',
        },
    );
};

export default UserModel;
