import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';
import RoomModel from './rooms.model';

export interface RoomPictureAttribute {
    id?: string;
    url?: string;
    room_id?: string;
    available_status?: boolean;
    created_at?: string;
    update_at?: string;
}

export interface RoomPictureAttributeCreation extends Optional<RoomPictureAttribute, 'id'> { }



class RoomPictureModel extends Model<RoomPictureAttribute, RoomPictureAttributeCreation> implements RoomPictureAttribute {
    declare id: string;

    declare url: string;

    declare room_id: string;

    declare available_status: boolean;
}

export const initRoomPictureModel = (connection: Sequelize) => {
    RoomPictureModel.init(
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            url: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            room_id: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: RoomModel,
                    key: 'id',
                },
            },
            available_status: {
                allowNull: false,
                type: DataTypes.BOOLEAN,
            },
        },
        {
            sequelize: connection,
            timestamps: false,
            tableName: 'room_pictures',
        },
    );
};

export default RoomPictureModel;
