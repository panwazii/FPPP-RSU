import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';

export interface AdminTypeAttribute {
    id?: number;
    name?: string;
    created_at?: Date;
    update_at?: Date;
}

export interface AdminTypeAttributeCreation extends Optional<AdminTypeAttribute, 'id'> { }

class AdminTypeModel extends Model<AdminTypeAttribute, AdminTypeAttributeCreation> implements AdminTypeAttribute {
    public id!: number;

    public name!: string;

    public created_at!: Date;

    public update_at!: Date;
}

export const initAdminTypeModel = (connection: Sequelize) => {
    AdminTypeModel.init(
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
        },
        {
            sequelize: connection,
            timestamps: false,
            tableName: 'admin_types',
        },
    );
};

export default AdminTypeModel;
