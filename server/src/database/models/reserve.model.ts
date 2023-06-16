import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';
import UserModel from './users.model';
import RoomModel from './rooms.model';

export interface ReserveAttribute {
    id?: string;
    user_id?: number;
    room_id?: number;
    date_time?: string;
    available_status?: boolean;
    created_at?: string;
    update_at?: string;
}

export interface ReserveAttributeCreation extends Optional<ReserveAttribute, 'id'> { }



class ReserveModel extends Model<ReserveAttribute, ReserveAttributeCreation> implements ReserveAttribute {
    declare id: string;

    declare user_id: number;

    declare room_id: number;

    declare date_time: string;

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
                allowNull: false,
                references: {
                    model: RoomModel,
                    key: 'id',
                },
            },
            date_time: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            available_status: {
                allowNull: false,
                type: DataTypes.BOOLEAN,
            },
        },
        {
            sequelize: connection,
            timestamps: false,
            tableName: 'reserve',
        },
    );
};

export default ReserveModel;
