import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';

export interface AdminAttribute {
    id?: string;
    type?: string;
    fname?: string;
    lname?: string;
    email?: string;
    password?: string;
    tel?: string;
    status?: number;
    created_at?: Date;
    updated_at?: Date;
}

export interface AdminAttributeCreation extends Optional<AdminAttribute, 'id'> { }

class AdminModel extends Model<AdminAttribute, AdminAttributeCreation> implements AdminAttribute {
    declare id: string;

    declare type: string;

    declare fname: string;

    declare lname: string;

    declare email: string;

    declare password: string;

    declare tel: string;

    declare status: number;

    declare created_at: Date;

    declare updated_at: Date;
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
            type: {
                type: DataTypes.ENUM('ADMIN','SUPERADMIN'),
                allowNull: false,
            },
            fname: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            lname: {
                allowNull: false,
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
            updated_at: {
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
