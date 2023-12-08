import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';
import EquipmentInfoModel from './equipment_infos.model';
import CartModel from './carts.model';

export interface CartItemAttribute {
    id?: string;
    cart_id?: string;
    equipment_info_id:string;
    created_at?: Date;
    update_at?: Date;
}

export interface CartItemAttributeCreation extends Optional<CartItemAttribute, 'id'> { }

class CartItemModel extends Model<CartItemAttribute, CartItemAttributeCreation> implements CartItemAttribute {
    declare id: string;

    declare cart_id: string;

    declare equipment_info_id: string;

    declare created_at: Date;

    declare update_at: Date;
}

export const initCartItemModel = (connection: Sequelize) => {
    CartItemModel.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            cart_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: CartModel,
                    key: 'id',
                },
            },
            equipment_info_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: EquipmentInfoModel,
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
            tableName: 'cart_items',
        },
    );
};

export default CartItemModel;
