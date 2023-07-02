import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';

export interface EquipmentInfoAttribute {
    id?: string;
    name?: string;
    details?: string;
    price?: number;
    rent_price?: number;
    picture?: string;
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
            tableName: 'equipment_info',
        },
    );
};

export default EquipmentInfoModel;
