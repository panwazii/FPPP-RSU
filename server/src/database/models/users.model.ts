import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';
import UserTypeModel from './user_types.model';

export interface UserAttribute {
    id?: string;
    type_id?: number;
    fname?: string;
    lname?: string;
    email?: string;
    password?: string;
    tel?: string;
    avatar?: string;
    verify_status?: boolean;
    available_status?: boolean;
    created_at?: Date;
    update_at?: Date;
}

export interface UserAttributeCreation extends Optional<UserAttribute, 'id'> { }

class UserModel extends Model<UserAttribute, UserAttributeCreation> implements UserAttribute {
    public id!: string;

    public type_id!: number;

    public fname!: string;

    public lname!: string;

    public email!: string;

    public password!: string;

    public tel!: string;

    public avatar!: string;

    public verify_status!: boolean;

    public available_status!: boolean;

    public created_at!: Date;

    public update_at!: Date;
}

export const initUserModel = (connection: Sequelize) => {
    UserModel.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            type_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: UserTypeModel,
                    key: 'id',
                },
            },
            fname: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },
            lname: {
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
            tel: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            avatar: {
                allowNull: true,
                type: DataTypes.STRING(500),
            },
            verify_status: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
            available_status: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
                allowNull: false,
            },
            created_at: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            update_at: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize: connection,
            timestamps: false,
            tableName: 'users',
        },
    );
};

export default UserModel;
