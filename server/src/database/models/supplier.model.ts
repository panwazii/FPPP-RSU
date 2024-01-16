import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';

export interface SupplierAttribute {
    id?: number;
    name?: string;
    contact_info?: string;
    created_at?: Date;
    update_at?: Date;
    available_status?: boolean;
}

export interface SupplierAttributeCreation extends Optional<SupplierAttribute, 'id'> { }

class SupplierModel extends Model<SupplierAttribute, SupplierAttributeCreation> implements SupplierAttribute {
    declare id: number;

    declare name: string;

    declare contact_info: string;

    declare created_at: Date;

    declare update_at: Date;

    declare available_status: boolean;
}

export const initSupplierModel = (connection: Sequelize) => {
    SupplierModel.init(
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
            contact_info: {
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
            paranoid: true,
            sequelize: connection,
            timestamps: false,
            tableName: 'supplier',
        },
    );
};

export default SupplierModel;
