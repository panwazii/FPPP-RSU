import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';
import EquipmentInfoModel from './equipment_infos.model';
import UserModel from './users.model';

export interface CartAttribute {
    id?: string;
    user_id?: string;
    created_at?: Date;
    update_at?: Date;
}

export interface CartAttributeCreation extends Optional<CartAttribute, 'id'> { }

class CartModel extends Model<CartAttribute, CartAttributeCreation> implements CartAttribute {
    declare id: string;

    declare user_id: string;

    declare created_at: Date;

    declare update_at: Date;
}

export const initCartModel = (connection: Sequelize) => {
    CartModel.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: UserModel,
                    key: 'id',
                },
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
            tableName: 'carts',
        },
    );
};

export default CartModel;
