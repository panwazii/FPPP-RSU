import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';
export interface WebInfoAttribute {
    id?: string;
    details?: string;
    email?: string;
    tel?: string;
    location?: string;
    created_at?: Date;
    update_at?: Date;
}

export interface WebInfoAttributeCreation extends Optional<WebInfoAttribute, 'id'> { }

class WebInfoModel extends Model<WebInfoAttribute, WebInfoAttributeCreation> implements WebInfoAttribute {
    declare id: string;

    declare details: string;

    declare email: string;

    declare tel: string;

    declare location: string;

    declare created_at: Date;

    declare update_at: Date;
}

export const initWebInfoModel = (connection: Sequelize) => {
    WebInfoModel.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
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
