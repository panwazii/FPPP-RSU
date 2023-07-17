import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';

export interface EquipmentRentRateAttribute {
    id?: number;
    name?: string;
    created_at?: Date;
    update_at?: Date;
    available_status?: boolean;
}

export interface EquipmentRentRateAttributeCreation extends Optional<EquipmentRentRateAttribute, 'id'> { }

class EquipmentRentRateModel extends Model<EquipmentRentRateAttribute, EquipmentRentRateAttributeCreation> implements EquipmentRentRateAttribute {
    declare id: number;

    declare name: string;

    declare created_at: Date;

    declare update_at: Date;

    declare available_status: boolean;
}

export const initEquipmentRentRateModel = (connection: Sequelize) => {
    EquipmentRentRateModel.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            created_at: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            update_at: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            available_status: {
                allowNull: false,
                type: DataTypes.BOOLEAN,
            },
        },
        {
            sequelize: connection,
            timestamps: false,
            tableName: 'equipment_rent_rates',
        },
    );
};

export default EquipmentRentRateModel;
