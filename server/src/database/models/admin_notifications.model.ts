import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';
import AdminModel from './admins.model';

export interface AdminNotificationAttribute {
    id?: string;
    text?:string;
    admin_id?: string;
    created_at?: Date;
    update_at?: Date;
    status?: string;
}

export interface AdminNotificationAttributeCreation extends Optional<AdminNotificationAttribute, 'id'> { }

class AdminNotificationModel extends Model<AdminNotificationAttribute, AdminNotificationAttributeCreation> implements AdminNotificationAttribute {
    declare id: string;

    declare text: string;

    declare admin_id: string;

    declare created_at: Date;

    declare update_at: Date;

    declare status: string;
}

export const initAdminNotificationModel = (connection: Sequelize) => {
    AdminNotificationModel.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            text: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            admin_id: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: AdminModel,
                    key: 'id',
                },
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
            status: {
                allowNull: false,
                type: DataTypes.ENUM('READ','UNREAD'),
            },
        },
        {
            sequelize: connection,
            timestamps: false,
            tableName: 'admin_notifications',
        },
    );
};

export default AdminNotificationModel;
