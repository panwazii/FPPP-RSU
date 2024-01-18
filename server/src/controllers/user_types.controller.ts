import UserTypeModel, { UserTypeAttribute } from '../database/models/user_types.model';

class UserTypeController {
    public static async getByID(id: string) {
        return UserTypeModel.findOne({
            where: {
                id: id,
            },
            raw: true
        });
    }

    public static async getAllUserTypes(limit: number, offset: number) {
        return UserTypeModel.findAndCountAll({
            // where: { available_status: true },
            limit,
            offset,
            raw: true
        });
    }
    public static async getAllUserTypesRaw() {
        return UserTypeModel.findAndCountAll({ raw: true });
    }

    public static async createUserType(data: any) {
        const packet: UserTypeAttribute = {
            name: data.name,
        };

        return UserTypeModel.create(packet)
    }

    public static async update(data: any) {
        return UserTypeModel.update({
            name: data.name,
        }, {
            where: {
                id: data.id,
            },
        })
    }

    public static async delete(id: string) {
        return UserTypeModel.destroy({
            where: {
                id: id,
            }
        })
    }

}

export default UserTypeController;
