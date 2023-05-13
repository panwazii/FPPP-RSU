import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';

export interface GlobalEquipmentAttribute {
    id?: number;
    name?: string;
    details?: string;
    price?: number;
    rent_price?: number;
    picture?: string;
    available_status?: boolean;
    created_at?: string;
    update_at?: string;
}

export interface GlobalEquipmentAttributeCreation extends Optional<GlobalEquipmentAttribute, 'id'> { }



class GlobalEquipmentModel extends Model<GlobalEquipmentAttribute, GlobalEquipmentAttributeCreation> implements GlobalEquipmentAttribute {
    public id!: number;

    public name!: string;

    public details!: string;

    public price!: number;

    public rent_price!: number;

    public picture!: string;

    public available_status!: boolean;
}

export const initGlobalEquipmentModel = (connection: Sequelize) => {
    GlobalEquipmentModel.init(
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
            tableName: 'global_equipments',
        },
    );
};

export default GlobalEquipmentModel;
