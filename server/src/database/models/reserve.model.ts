import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';
import UserModel from './users.model';
import RoomModel from './rooms.model';

export interface ReserveAttribute {
    id?: string;
    user_id?: number;
    room_id?: number;
    fname?: string;
    lname?: string;
    email?: string;
    tel?: string;
    time_start?: string;
    time_end?: string;
    available_status?: boolean;
    created_at?: string;
    update_at?: string;
}

export interface ReserveAttributeCreation extends Optional<ReserveAttribute, 'id'> { }



class ReserveModel extends Model<ReserveAttribute, ReserveAttributeCreation> implements ReserveAttribute {
    declare id: string;

    declare user_id: number;

    declare room_id: number;

    declare fname: string;

    declare lname: string;

    declare email: string;

    declare tel: string;

    declare time_start: string;

    declare time_end: string;

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
            tel: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            time_start: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            time_end: {
                type: DataTypes.DATE,
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
