import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';

export interface LogAttribute {
    id?: string;

    type?: string;

    uuid?: string;

    fname?: string;

    lname?: string;

    ip?: string;

    route?: string;

    method?: string;

    body?: any;

    params?: any;

    time?: string;
}

export interface LogAttributeCreation extends Optional<LogAttribute, 'id'> { }



class LogModel extends Model<LogAttribute, LogAttributeCreation> implements LogAttribute {
    declare id: string;

    declare type: string;

    declare uuid: string;

    declare fname: string;

    declare lname: string;

    declare ip: string;

    declare route: string;

    declare method: string;

    declare body: any;

    declare params: any;

    declare time: string;
}

export const initLogModel = (connection: Sequelize) => {
    LogModel.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            type: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            uuid: {
                allowNull: false,
                type: DataTypes.UUID
            },
            fname: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            lname: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            ip: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            route: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            method: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            body: {
                allowNull: true,
                type: DataTypes.JSON,
            },
            params: {
                allowNull: true,
                type: DataTypes.JSON,
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

export default LogModel;
