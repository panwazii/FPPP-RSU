import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';

export interface UserTypeAttribute {
    id?: number;
    name?: string;
    verified?: boolean;
    created_at?: Date;
    update_at?: Date;
}

export interface UserTypeAttributeCreation extends Optional<UserTypeAttribute, 'id'> { }

class UserTypeModel extends Model<UserTypeAttribute, UserTypeAttributeCreation> implements UserTypeAttribute {
    declare id: number;

    declare name: string;

    declare verified: boolean;

    declare created_at: Date;

    declare update_at: Date;
}

export const initUserTypeModel = (connection: Sequelize) => {
    UserTypeModel.init(
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
            paranoid: true,
            sequelize: connection,
            timestamps: false,
            tableName: 'user_types',
        },
    );
};

export default UserTypeModel;
