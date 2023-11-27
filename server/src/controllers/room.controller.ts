import RoomModel, { RoomAttribute } from '../database/models/rooms.model';
import RoomPictureModel, { RoomPictureAttribute } from '../database/models/room_pictures.model';

class RoomController {
    //Public
    public static async getByIDPublic(roomId: string) {
        return RoomModel.findAll({
            where: {
                id: roomId,
                available_status: true
            },
            include: [{
                model: RoomPictureModel, as: 'picture'
            }],
        });
    }

    public static async getAllRoomsPublic(limit: number, offset: number) {
        return RoomModel.findAndCountAll({
            distinct: true,
            where: { available_status: true },
            include: [{
                model: RoomPictureModel, as: 'picture',
                where: { available_status: true }
            }],
            order: [["name", "ASC"]],
            limit,
            offset,
        });
    }

    //Admin
    public static async getAllRoomsAdmin(limit: number, offset: number) {
        return RoomModel.findAndCountAll({
            distinct: true,
            include: [{
                model: RoomPictureModel, as: 'picture',
            }],
            order: [["name", "ASC"]],
            limit,
            offset,
        });
    }

    public static async getByIDAdmin(roomId: string) {
        return RoomModel.findAll({
            where: {
                id: roomId,
            },
            include: [{
                model: RoomPictureModel, as: 'picture'
            }],
        });
    }

    public static async createRoom(data: any) {
        const packet: RoomAttribute = {
            name: data.name,
            details: data.details,
            rent_price: data.rent_price,
            available_status: true,
        };

        return RoomModel.create(packet)
    }

    public static async update(data: any) {
        return RoomModel.update({
            name: data.name,
            details: data.details,
            rent_price: data.rent_price,
        }, {
            where: {
                id: data.id,
            },
        }).then(() => true)
            .catch(() => false);
    }

    public static async createRoomPicture(url: string, id: string) {
        const packet: RoomPictureAttribute = {
            url: url,
            room_id: id,
            available_status: true,
        };

        return RoomPictureModel.create(packet)
    }

    // Drop down
    public static async getDropdownRoom() {
        return RoomModel.findAll({
            attributes: { include: ['id', 'name'] },
            include: [{
                model: RoomPictureModel, as: 'picture',
                where: { available_status: true }
            }],
        });
    }

}

export default RoomController;
