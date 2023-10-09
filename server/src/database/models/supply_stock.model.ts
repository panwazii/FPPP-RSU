import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';
import EquipmentInfoModel from './equipment_infos.model';
import SupplierModel from './supplier.model';

export interface SupplyStockAttribute {
    id?: number;
    quantity?: number;
    price?: number;
    date?: Date;
    remark?: string;
    supplier_id?: number;
    supply_stock_id?: string;
    created_at?: Date;
    update_at?: Date;
    available_status?: boolean;
}

export interface SupplyStockAttributeCreation extends Optional<SupplyStockAttribute, 'id'> { }

class SupplyStockModel extends Model<SupplyStockAttribute, SupplyStockAttributeCreation> implements SupplyStockAttribute {
    declare id: number;

    declare quantity: number;

    declare price: number;

    declare date: Date;

    declare remark: string;

    declare supplier_id: number;

    declare supply_stock_id: string;

    declare created_at: Date;

    declare update_at: Date;

    declare available_status: boolean;
}

export const initSupplyStockModel = (connection: Sequelize) => {
    SupplyStockModel.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            quantity: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            price: {
                allowNull: false,
                type: DataTypes.DECIMAL,
            },
            date: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            remark: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            supplier_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: SupplierModel,
                    key: 'id',
                },
            },
            supply_stock_id: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: EquipmentInfoModel,
                    key: 'id',
                },
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
            tableName: 'supply_stock',
        },
    );
};

export default SupplyStockModel;
