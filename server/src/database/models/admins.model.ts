import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';
import AdminTypeModel from './admin_types.model';

export interface AdminAttribute {
    id?: string;
    type_id?: number;
    fname?: string;
    lname?: string;
    email?: string;
    password?: string;
    tel?: string;
    avatar?: string;
    status?: number;
    created_at?: Date;
    update_at?: Date;
}

export interface AdminAttributeCreation extends Optional<AdminAttribute, 'id'> { }

class AdminModel extends Model<AdminAttribute, AdminAttributeCreation> implements AdminAttribute {
    declare id: string;

    declare type_id: number;

    declare fname: string;

    declare lname: string;

    declare email: string;

    declare password: string;

    declare tel: string;

    declare avatar: string;

    declare status: number;

    declare created_at: Date;

    declare update_at: Date;
}

export const initAdminModel = (connection: Sequelize) => {
    AdminModel.init(
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
                    model: AdminTypeModel,
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
            status: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1,
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
            tableName: 'admins',
        },
    );
};

export default AdminModel;
