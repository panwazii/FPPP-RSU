import EquipmentInfoModel from '../database/models/equipment_infos.model';
import CartModel, { CartAttribute } from '../database/models/carts.model';
import CartItemModel, { CartItemAttribute } from '../database/models/cart_items.model';
import ProductionLineModel from '../database/models/production_lines.model';

class CartController {
    public static async getAll(userId: string) {
        return CartModel.findAll({
            where: { user_id: userId },
            include: [{
                model: CartItemModel, as: 'cart_items',
                include: [{
                    model: EquipmentInfoModel, as: 'equipment',
                    include: [{
                        model: ProductionLineModel, as: 'production_line'
                    }]
                }]
            }]
        });
    }

    public static async getByUserId(userId: string) {
        return CartModel.findOne({
            where: { user_id: userId },
            raw: true
        });
    }

    public static async create(userId: string) {

        const packet: CartAttribute = {
            user_id: userId,
        };

        return CartModel.create(packet)
    }

    public static async createItems(cartId: string, equipmentInfoId: string) {

        const packet: CartItemAttribute = {
            cart_id: cartId,
            equipment_info_id: equipmentInfoId,
        };

        return CartItemModel.create(packet)
    }

    public static async delete(id: string) {
        return CartModel.destroy({
            where: {
                id: id,
            },
        });
    }

    public static async deleteItems(id: string) {
        return CartItemModel.destroy({
            where: {
                id: id,
            },
        });
    }

    public static async deleteAllItems(id: string) {
        return CartItemModel.destroy({
            where: {
                cart_id: id,
            },
        });
    }

}

export default CartController;
