import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';
import RoomModel from './rooms.model';
import EquipmentInfoModel from './equipment_infos.model';
import SupplierModel from './supplier.model';

export interface EquipmentsAttribute {
    id?: string;
    serial_number?: string;
    price?: number;
    room_id?: string;
    equipment_info_id?: string;
    supplier_id?: number;
    equipment_status?: string;
    available_status?: boolean;
    created_at?: Date;
    update_at?: Date;
}

export interface EquipmentsAttributeCreation extends Optional<EquipmentsAttribute, 'id'> { }

export const EquipmentStatus = {
    AVAILABLE: 'available',
    UNAVAILABLE: 'unavailable',
    REPAIR: 'repair',
}

class EquipmentsModel extends Model<EquipmentsAttribute, EquipmentsAttributeCreation> implements EquipmentsAttribute {
    declare id: string;

    declare serial_number: string;

    declare price: number;

    declare room_id: string;

    declare equipment_info_id: string;

    declare supplier_id: number;

    declare equipment_status: string;

    declare available_status: boolean;
}

export const initEquipmentsModel = (connection: Sequelize) => {
    EquipmentsModel.init(
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
            price: {
                allowNull: false,
                type: DataTypes.DECIMAL,
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
            supplier_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: SupplierModel,
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
            tableName: 'equipments',
        },
    );
};

export default EquipmentsModel;
