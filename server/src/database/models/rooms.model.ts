import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';

export interface RoomAttribute {
    id?: number;
    name?: string;
    details?: string;
    picture?: string;
    price?: string;
    available_status?: boolean;
    created_at?: string;
    update_at?: string;
}

export interface RoomAttributeCreation extends Optional<RoomAttribute, 'id'> { }



class RoomModel extends Model<RoomAttribute, RoomAttributeCreation> implements RoomAttribute {
    public id!: number;

    public name!: string;

    public details!: string;

    public picture!: string;

    public price!: string;

    public available_status!: boolean;
}

export const initRoomModel = (connection: Sequelize) => {
    RoomModel.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },
            details: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },
            picture: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            price: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            available_status: {
                allowNull: false,
                type: DataTypes.BOOLEAN,
            },
        },
        {
            sequelize: connection,
            timestamps: false,
            tableName: 'rooms',
        },
    );
};

export default RoomModel;
