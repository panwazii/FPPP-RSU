import UserNotificationModel, { UserNotificationAttribute } from '../database/models/user_notifications.model';
import AdminNotificationModel, { AdminNotificationAttribute } from '../database/models/admin_notifications.model';

class NotificationController {
    public static async getAllUser(user_id: string) {
        return UserNotificationModel.findAll({
            where: { user_id: user_id },
            raw: true
        });
    }

    public static async createUser(text: string, user_id: string) {

        const packet: UserNotificationAttribute = {
            text: text,
            user_id: user_id,
            status: 'UNREAD'
        };

        return UserNotificationModel.create(packet)
    }

    public static async updateUser(id: string) {
        return UserNotificationModel.update({
            status: 'READ'
        }, {
            where: {
                id: id,
            },
        })
    }

    public static async deleteUser(id: string) {
        return UserNotificationModel.destroy({
            where: {
                id: id,
            },
        }).then((rowDeleted) => rowDeleted > 0);
    }

    public static async getAllAdmin(admin_id: string) {
        return AdminNotificationModel.findAll({
            where: { admin_id: admin_id },
            raw: true
        });
    }

    public static async createAdmin(text: string, admin_id: string) {

        const packet: AdminNotificationAttribute = {
            text: text,
            admin_id: admin_id,
            status: 'UNREAD'
        };

        return AdminNotificationModel.create(packet)
    }

    public static async updateAdmin(id: string) {
        return AdminNotificationModel.update({
            status: 'READ'
        }, {
            where: {
                id: id,
            },
        })
    }

    public static async deleteAdmin(id: string) {
        return AdminNotificationModel.destroy({
            where: {
                id: id,
            },
        }).then((rowDeleted) => rowDeleted > 0);
    }
}

export default NotificationController;
