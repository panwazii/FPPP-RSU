import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';
import EquipmentRentRateModel from './equipment_rent_rates.model';
import ProductionLineModel from './production_lines.model';

export interface EquipmentInfoAttribute {
    id?: string;
    name?: string;
    details?: string;
    average_price?: number;
    rent_price?: number;
    quantity?: number;
    type?: string;
    picture?: string;
    equipment_rent_rate_id?: number;
    production_line_id?: number;
    available_status?: boolean;
    created_at?: string;
    update_at?: string;
}

export interface EquipmentInfoAttributeCreation extends Optional<EquipmentInfoAttribute, 'id'> { }



class EquipmentInfoModel extends Model<EquipmentInfoAttribute, EquipmentInfoAttributeCreation> implements EquipmentInfoAttribute {
    declare id: string;

    declare name: string;

    declare details: string;

    declare average_price: number;

    declare rent_price: number;

    declare quantity: number;

    declare type: string;

    declare picture: string;

    declare equipment_rent_rate_id: number;

    declare production_line_id: number;

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
            average_price: {
                allowNull: false,
                type: DataTypes.DECIMAL,
            },
            rent_price: {
                allowNull: false,
                type: DataTypes.DECIMAL,
            },
            quantity: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            type: {
                allowNull: false,
                type: DataTypes.STRING,
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
            production_line_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: ProductionLineModel,
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
            tableName: 'equipment_infos',
        },
    );
};

export default EquipmentInfoModel;
