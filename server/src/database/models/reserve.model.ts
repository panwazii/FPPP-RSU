import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';
import UserModel from './users.model';
import RoomModel from './rooms.model';

export interface ReserveAttribute {
    id?: number;
    user_id?: number;
    room_id?: number;
    date_time?: string;
    available_status?: boolean;
    created_at?: string;
    update_at?: string;
}

export interface ReserveAttributeCreation extends Optional<ReserveAttribute, 'id'> { }



class ReserveModel extends Model<ReserveAttribute, ReserveAttributeCreation> implements ReserveAttribute {
    public id!: number;

    public user_id!: number;

    public room_id!: number;

    public date_time!: string;

    public available_status!: boolean;
}

export const initReserveModel = (connection: Sequelize) => {
    ReserveModel.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: UserModel,
                    key: 'user_id',
                },
            },
            room_id: {
                type: DataTypes.INTEGER,
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
