import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';
import EquipmentInfoModel from './equipment_infos.model';
import EquipmentStockModel from './equipment_stocks.model';
import ReserveModel from './reserve.model';

export interface ReserveEquipmentAttribute {
    id?: number;
    equipment_info_id?: number;
    equipment_stock_id?: number;
    reserve_id?: number;
    available_status?: boolean;
}

export interface ReserveEquipmentAttributeCreation extends Optional<ReserveEquipmentAttribute, 'id'> { }

class ReserveEquipmentModel extends Model<ReserveEquipmentAttribute, ReserveEquipmentAttributeCreation> implements ReserveEquipmentAttribute {
    declare id: number;

    declare equipment_info_id: number;

    declare equipment_stock_id: number;

    declare reserve_id: number;

    declare available_status: boolean;
}

export const initReserveEquipmentModel = (connection: Sequelize) => {
    ReserveEquipmentModel.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            equipment_info_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: EquipmentInfoModel,
                    key: 'id',
                },
            },
            equipment_stock_id: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: EquipmentStockModel,
                    key: 'id',
                },
            },
            reserve_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: ReserveModel,
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
            tableName: 'reserve_equipments',
        },
    );
};

export default ReserveEquipmentModel;
