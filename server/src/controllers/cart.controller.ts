import EquipmentInfoModel from '../database/models/equipment_infos.model';
import CartModel, { CartAttribute } from '../database/models/carts.model';

class CartController {
    public static async getAll(user_id: string) {
        return CartModel.findAll({
            where: { user_id: user_id },
            include: [{
                model: EquipmentInfoModel, as: 'equipment'
            }]
        });
    }

    public static async create(userId: string, equipmentInfoId: string) {

        const packet: CartAttribute = {
            user_id: userId,
            equipment_info_id: equipmentInfoId
        };

        return CartModel.create(packet)
    }

    public static async delete(id: string) {
        return CartModel.destroy({
            where: {
                id: id,
            },
        }).then((rowDeleted) => rowDeleted > 0);
    }
}

export default CartController;
