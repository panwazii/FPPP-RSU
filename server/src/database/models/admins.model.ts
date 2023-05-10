import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';

export interface AdminAttribute {
    id?: number;
    username?: string;
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
    public id!: number;

    public username!: string;

    public email!: string;

    public password!: string;

    public tel!: string;

    public avatar!: string;

    public status!: number;

    public created_at!: Date;

    public update_at!: Date;
}

export const initAdminModel = (connection: Sequelize) => {
    AdminModel.init(
        {
            id: {
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
            tel: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            avatar: {
                allowNull: false,
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
