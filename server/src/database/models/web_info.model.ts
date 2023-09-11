import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';
export interface WebInfoAttribute {
    id?: number;
    logo?: string;
    banner_picture?: string;
    banner_title?: string;
    about_picture?: string;
    about_title?: string;
    about_details?: string;
    service_title?: string;
    service_details?: string;
    contact_email?: string;
    contact_description?: string;
    contact_tel?: string;
    contact_address?: string;
    contact_location?: string;
    created_at?: Date;
    update_at?: Date;
}

export interface WebInfoAttributeCreation extends Optional<WebInfoAttribute, 'id'> { }

class WebInfoModel extends Model<WebInfoAttribute, WebInfoAttributeCreation> implements WebInfoAttribute {
    declare id: number;

    declare logo: string;

    declare banner_picture: string;

    declare banner_title: string;

    declare about_picture: string;

    declare about_title: string;

    declare about_details: string;

    declare service_title: string;

    declare service_details: string;

    declare contact_email: string;

    declare contact_description: string;

    declare contact_tel: string;

    declare contact_address: string;

    declare contact_location: string;

    declare created_at: Date;

    declare update_at: Date;
}

export const initWebInfoModel = (connection: Sequelize) => {
    WebInfoModel.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            logo: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },
            banner_picture: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },
            banner_title: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },
            about_picture: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },
            about_title: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },
            about_details: {
                allowNull: false,
                unique: true,
                type: DataTypes.TEXT,
            },
            service_title: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },
            service_details: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },
            contact_email: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },
            contact_description: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },
            contact_tel: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },
            contact_address: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },
            contact_location: {
                allowNull: false,
                unique: true,
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
            tableName: 'web_infos',
        },
    );
};

export default WebInfoModel;
