import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';
import RoomModel from './rooms.model';
import EquipmentInfoModel from './equipment_info.model';

export interface EquipmentStockAttribute {
    id?: string;
    serial_number?: string;
    room_id?: number;
    equipment_info_id?: number;
    equipment_status?: string;
    available_status?: boolean;
    created_at?: string;
    update_at?: string;
}

export interface EquipmentStockAttributeCreation extends Optional<EquipmentStockAttribute, 'id'> { }

export const EquipmentStatus = {
    AVAILABLE: 'available',
    UNAVAILABLE: 'unavailable',
    REPAIR: 'repair',
}

class EquipmentStockModel extends Model<EquipmentStockAttribute, EquipmentStockAttributeCreation> implements EquipmentStockAttribute {
    declare id: string;

    declare serial_number: string;

    declare room_id: number;

    declare equipment_info_id: number;

    declare equipment_status: string;

    declare available_status: boolean;
}

export const initEquipmentStockModel = (connection: Sequelize) => {
    EquipmentStockModel.init(
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            serial_number: {
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
            equipment_info_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: EquipmentInfoModel,
                    key: 'id',
                },
            },
            equipment_status: {
                allowNull: false,
                type: DataTypes.ENUM('available', 'unavailable', 'repair'),
            },
            available_status: {
                allowNull: false,
                type: DataTypes.BOOLEAN,
            },
        },
        {
            sequelize: connection,
            timestamps: false,
            tableName: 'equipment_stock',
        },
    );
};

export default EquipmentStockModel;
