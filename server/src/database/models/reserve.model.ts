import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';
import UserModel from './users.model';
import RoomModel from './rooms.model';

export interface ReserveAttribute {
    id?: string;
    user_id?: string;
    room_id?: string;
    time_start?: Date;
    time_end?: Date;
    details?: string;
    receipt?: string;
    approval_status?: string;
    available_status?: boolean;
    created_at?: Date;
    update_at?: Date;
}

export interface ReserveAttributeCreation extends Optional<ReserveAttribute, 'id'> { }



class ReserveModel extends Model<ReserveAttribute, ReserveAttributeCreation> implements ReserveAttribute {
    declare id: string;

    declare user_id: string;

    declare room_id: string;

    declare time_start: Date;

    declare time_end: Date;

    declare details: string;

    declare receipt: string;

    declare approval_status: string;

    declare available_status: boolean;
}

export const initReserveModel = (connection: Sequelize) => {
    ReserveModel.init(
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: UserModel,
                    key: 'id',
                },
            },
            room_id: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: RoomModel,
                    key: 'id',
                },
            },
            time_start: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            time_end: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            details: {
                allowNull: true,
                type: DataTypes.TEXT,
            },
            receipt: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            approval_status: {
                allowNull: false,
                type: DataTypes.ENUM('WAITING', 'RETURN_QUOTATION', 'CONFIRM_QUOTATION', 'CONFIRM', 'CANCEL'),
            },
            available_status: {
                allowNull: false,
                type: DataTypes.BOOLEAN,
            },
        },
        {
            paranoid: true,
            sequelize: connection,
            timestamps: false,
            tableName: 'reserve',
        },
    );
};

export default ReserveModel;
