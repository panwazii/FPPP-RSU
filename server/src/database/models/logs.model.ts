import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';

export interface LogsAttribute {
    id?: string;
    is_admin?: boolean;
    type?: string;
    operation?: string;
    time?: string;
}

export interface LogsAttributeCreation extends Optional<LogsAttribute, 'id'> { }



class LogsModel extends Model<LogsAttribute, LogsAttributeCreation> implements LogsAttribute {
    public id!: string;

    public is_admin!: boolean;

    public type!: string;

    public operation!: string;

    public time!: string;
}

export const initLogsModel = (connection: Sequelize) => {
    LogsModel.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            is_admin: {
                allowNull: false,
                unique: true,
                type: DataTypes.BOOLEAN,
            },
            type: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },
            operation: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            time: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize: connection,
            timestamps: false,
            tableName: 'logs',
        },
    );
};

export default LogsModel;
