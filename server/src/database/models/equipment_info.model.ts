import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';
import EquipmentRentRateModel from './equipment_rent_rate.model';

export interface EquipmentInfoAttribute {
    id?: string;
    name?: string;
    details?: string;
    price?: number;
    rent_price?: number;
    picture?: string;
    equipment_rent_rate_id?: number;
    available_status?: boolean;
    created_at?: string;
    update_at?: string;
}

export interface EquipmentInfoAttributeCreation extends Optional<EquipmentInfoAttribute, 'id'> { }



class EquipmentInfoModel extends Model<EquipmentInfoAttribute, EquipmentInfoAttributeCreation> implements EquipmentInfoAttribute {
    declare id: string;

    declare name: string;

    declare details: string;

    declare price: number;

    declare rent_price: number;

    declare picture: string;

    declare equipment_rent_rate_id: number;

    declare available_status: boolean;
}

export const initEquipmentInfoModel = (connection: Sequelize) => {
    EquipmentInfoModel.init(
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
            equipment_rent_rate_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: EquipmentRentRateModel,
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
            tableName: 'equipment_info',
        },
    );
};

export default EquipmentInfoModel;
