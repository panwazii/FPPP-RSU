import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';
import EquipmentInfoModel from './equipment_infos.model';
import EquipmentStockModel from './equipments.model';
import UserModel from './users.model';

export interface ReserveEquipmentOnlyAttribute {
    id?: string;
    user_id?: string;
    equipment_info_id?: string;
    equipments_id?: string;
    time_start?: Date;
    time_end?: Date;
    quantity?: number;
    approval_status?: string;
    available_status?: boolean;
}

export interface ReserveEquipmentOnlyAttributeCreation extends Optional<ReserveEquipmentOnlyAttribute, 'id'> { }

class ReserveEquipmentOnlyModel extends Model<ReserveEquipmentOnlyAttribute, ReserveEquipmentOnlyAttributeCreation> implements ReserveEquipmentOnlyAttribute {
    declare id: string;

    declare user_id?: string;

    declare equipment_info_id: string;

    declare equipments_id: string;

    declare time_start: Date;

    declare time_end: Date;

    declare quantity: number;

    declare approval_status: string;

    declare available_status: boolean;
}

export const initReserveEquipmentOnlyModel = (connection: Sequelize) => {
    ReserveEquipmentOnlyModel.init(
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: UserModel,
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
            equipments_id: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: EquipmentStockModel,
                    key: 'id',
                },
            },
            time_start: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            time_end: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1
            },
            approval_status: {
                allowNull: false,
                type: DataTypes.ENUM('WAITING','RETURN_QUOTATION','CONFIRM'),
            },
            available_status: {
                allowNull: false,
                type: DataTypes.BOOLEAN,
            },
        },
        {
            sequelize: connection,
            timestamps: false,
            tableName: 'reserve_equipment_onlys',
        },
    );
};

export default ReserveEquipmentOnlyModel;
