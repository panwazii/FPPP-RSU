import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';
import AdminModel from './admins.model';
import ReserveModel from './reserve.model';

export interface QuotationAttribute {
    id?: string;
    reserve_id?: string;
    admin_id?: string;
    equipment_price?: number;
    room_price?: number;
}

export interface QuotationAttributeCreation extends Optional<QuotationAttribute, 'id'> { }



class QuotationModel extends Model<QuotationAttribute, QuotationAttributeCreation> implements QuotationAttribute {
    declare id: string;

    declare reserve_id: string;

    declare admin_id: string;

    declare equipment_price: number;

    declare room_price: number;
}

export const initQuotationModel = (connection: Sequelize) => {
    QuotationModel.init(
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            reserve_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: ReserveModel,
                    key: 'id',
                },
            },
            admin_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: AdminModel,
                    key: 'id',
                },
            },
            equipment_price: {
                allowNull: false,
                type: DataTypes.DECIMAL,
            },
            room_price: {
                allowNull: false,
                type: DataTypes.DECIMAL,
            },
        },
        {
            paranoid: true,
            sequelize: connection,
            timestamps: false,
            tableName: 'quotations',
        },
    );
};

export default QuotationModel;
