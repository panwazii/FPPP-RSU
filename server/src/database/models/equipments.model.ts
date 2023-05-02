import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';

export interface EquipmentAttribute {
    id?: number;
    room_id?: number;
    name?: string;
    details?: string;
    price?: string;
    picture?: string;
    available_status?: boolean;
    created_at?: string;
    update_at?: string;
}

export interface EquipmentAttributeCreation extends Optional<EquipmentAttribute, 'id'> { }



class EquipmentModel extends Model<EquipmentAttribute, EquipmentAttributeCreation> implements EquipmentAttribute {
    public id!: number;

    public room_id!: number;

    public name!: string;

    public details!: string;

    public price!: string;

    public picture!: string;

    public available_status!: boolean;
}

export const initEquipmentModel = (connection: Sequelize) => {
    EquipmentModel.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            room_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            name: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },
            details: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },
            price: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
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
            tableName: 'rooms',
        },
    );
};

export default EquipmentModel;
