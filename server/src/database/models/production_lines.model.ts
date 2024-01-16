import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';

export interface ProductionLineAttribute {
    id?: number;
    name?: string;
    created_at?: Date;
    update_at?: Date;
    available_status?: boolean;
}

export interface ProductionLineAttributeCreation extends Optional<ProductionLineAttribute, 'id'> { }

class ProductionLineModel extends Model<ProductionLineAttribute, ProductionLineAttributeCreation> implements ProductionLineAttribute {
    declare id: number;

    declare name: string;

    declare created_at: Date;

    declare update_at: Date;

    declare available_status: boolean;
}

export const initProductionLineModel = (connection: Sequelize) => {
    ProductionLineModel.init(
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
            paranoid: true,
            sequelize: connection,
            timestamps: false,
            tableName: 'production_lines',
        },
    );
};

export default ProductionLineModel;
