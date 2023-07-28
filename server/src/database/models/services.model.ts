import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';
export interface ServiceAttribute {
    id?: string;
    title:string;
    details?: string;
    picture?: string;
    created_at?: Date;
    update_at?: Date;
}

export interface ServiceAttributeCreation extends Optional<ServiceAttribute, 'id'> { }

class ServiceModel extends Model<ServiceAttribute, ServiceAttributeCreation> implements ServiceAttribute {
    declare id: string;

    declare title: string;

    declare details: string;

    declare picture: string;

    declare created_at: Date;

    declare update_at: Date;
}

export const initServiceModel = (connection: Sequelize) => {
    ServiceModel.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            title:{
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },
            details: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },
            picture: {
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
            tableName: 'services',
        },
    );
};

export default ServiceModel;
