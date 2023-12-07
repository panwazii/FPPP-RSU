import NotificationModel, { NotificationAttribute } from '../database/models/notifications.model';

class NotificationController {
    public static async getAll(user_id: string) {
        return NotificationModel.findAll({
            where: { user_id: user_id },
            raw: true
        });
    }

    public static async create(data: any) {

        const packet: NotificationAttribute = {
            title: data.title,
            user_id: data.user_id,
            read: false
        };

        return NotificationModel.create(packet)
    }

    public static async update(user_id: string) {
        return NotificationModel.update({
            read: true
        }, {
            where: {
                id: user_id,
            },
        })
    }

    public static async delete(id: string) {
        return NotificationModel.destroy({
            where: {
                id: id,
            },
        }).then((rowDeleted) => rowDeleted > 0);
    }
}

export default NotificationController;
