import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';

export interface RoomAttribute {
    id?: string;
    name?: string;
    details?: string;
    rent_price?: number;
    available_status?: boolean;
    created_at?: string;
    update_at?: string;
}

export interface RoomAttributeCreation extends Optional<RoomAttribute, 'id'> { }



class RoomModel extends Model<RoomAttribute, RoomAttributeCreation> implements RoomAttribute {
    declare id: string;

    declare name: string;

    declare details: string;

    declare rent_price: number;

    declare available_status: boolean;
}

export const initRoomModel = (connection: Sequelize) => {
    RoomModel.init(
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            details: {
                allowNull: false,
                type: DataTypes.TEXT,
            },
            rent_price: {
                allowNull: false,
                type: DataTypes.DECIMAL,
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
            tableName: 'rooms',
        },
    );
};

export default RoomModel;
