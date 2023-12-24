import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';
import UserModel from './users.model';

export interface UserNotificationAttribute {
    id?: string;
    text?:string;
    user_id?: string;
    created_at?: Date;
    update_at?: Date;
    status?: string;
}

export interface UserNotificationAttributeCreation extends Optional<UserNotificationAttribute, 'id'> { }

class UserNotificationModel extends Model<UserNotificationAttribute, UserNotificationAttributeCreation> implements UserNotificationAttribute {
    declare id: string;

    declare text: string;

    declare user_id: string;

    declare created_at: Date;

    declare update_at: Date;

    declare status: string;
}

export const initUserNotificationModel = (connection: Sequelize) => {
    UserNotificationModel.init(
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
                type: DataTypes.ENUM('READ','UNREAD'),
            },
        },
        {
            sequelize: connection,
            timestamps: false,
            tableName: 'user_notifications',
        },
    );
};

export default UserNotificationModel;
