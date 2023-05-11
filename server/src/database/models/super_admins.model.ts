import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';

export interface SuperAdminAttribute {
    id?: number;
    username?: string;
    password?: string;
    created_at?: Date;
    update_at?: Date;
}

export interface SuperAdminAttributeCreation extends Optional<SuperAdminAttribute, 'id'> { }

class SuperAdminModel extends Model<SuperAdminAttribute, SuperAdminAttributeCreation> implements SuperAdminAttribute {
    public id!: number;

    public username!: string;

    public password!: string;

    public created_at!: Date;

    public update_at!: Date;
}

export const initSuperAdminModel = (connection: Sequelize) => {
    SuperAdminModel.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            username: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },
            password: {
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
            tableName: 'super_admins',
        },
    );
};

export default SuperAdminModel;
