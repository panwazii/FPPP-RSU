import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';

export interface RentRateAttribute {
    id?: number;
    name?: string;
    created_at?: Date;
    update_at?: Date;
    available_status?: boolean;
}

export interface RentRateAttributeCreation extends Optional<RentRateAttribute, 'id'> { }

class RentRateModel extends Model<RentRateAttribute, RentRateAttributeCreation> implements RentRateAttribute {
    declare id: number;

    declare name: string;

    declare created_at: Date;

    declare update_at: Date;

    declare available_status: boolean;
}

export const initRentRateModel = (connection: Sequelize) => {
    RentRateModel.init(
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

export default RentRateModel;
