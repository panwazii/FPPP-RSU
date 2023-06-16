import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';
import RoomModel from './rooms.model';

export interface EquipmentAttribute {
    id?: string;
    room_id?: number;
    name?: string;
    details?: string;
    price?: number;
    rent_price?: number;
    picture?: string;
    available_status?: boolean;
    created_at?: string;
    update_at?: string;
}

export interface EquipmentAttributeCreation extends Optional<EquipmentAttribute, 'id'> { }



class EquipmentModel extends Model<EquipmentAttribute, EquipmentAttributeCreation> implements EquipmentAttribute {
    declare id: string;

    declare room_id: number;

    declare name: string;

    declare details: string;

    declare price: number;

    declare rent_price: number;

    declare picture: string;

    declare available_status: boolean;
}

export const initEquipmentModel = (connection: Sequelize) => {
    EquipmentModel.init(
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            room_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: RoomModel,
                    key: 'id',
                },
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            details: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            price: {
                allowNull: false,
                type: DataTypes.DECIMAL,
            },
            rent_price: {
                allowNull: false,
                type: DataTypes.DECIMAL,
            },
            picture: {
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
            tableName: 'equipments',
        },
    );
};

export default EquipmentModel;
