import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';
import UserModel from './users.model';

export interface NotificationAttribute {
    id?: string;
    user_id?: string;
    created_at?: Date;
    update_at?: Date;
    status?: boolean;
}

export interface NotificationAttributeCreation extends Optional<NotificationAttribute, 'id'> { }

class NotificationModel extends Model<NotificationAttribute, NotificationAttributeCreation> implements NotificationAttribute {
    declare id: string;

    declare user_id: string;

    declare created_at: Date;

    declare update_at: Date;

    declare status: boolean;
}

export const initNotificationModel = (connection: Sequelize) => {
    NotificationModel.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: UserModel,
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
                type: DataTypes.BOOLEAN,
            },
        },
        {
            sequelize: connection,
            timestamps: false,
            tableName: 'notifications',
        },
    );
};

export default NotificationModel;
