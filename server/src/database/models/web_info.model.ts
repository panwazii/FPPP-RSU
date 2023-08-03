import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';
export interface WebInfoAttribute {
    id?: number;
    details?: string;
    email?: string;
    tel?: string;
    picture_name?: string;
    picture_url?: string;
    location?: string;
    created_at?: Date;
    update_at?: Date;
}

export interface WebInfoAttributeCreation extends Optional<WebInfoAttribute, 'id'> { }

class WebInfoModel extends Model<WebInfoAttribute, WebInfoAttributeCreation> implements WebInfoAttribute {
    declare id: number;

    declare details: string;

    declare email: string;

    declare tel: string;

    declare picture_name: string;

    declare picture_url: string;

    declare location: string;

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
            details: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },
            email: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },
            tel: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },
            location: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },
            picture_name: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            picture_url: {
                allowNull: true,
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
