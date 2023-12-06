import { Dialect, Sequelize } from 'sequelize';
import yn from 'yn';
import debug from 'debug';
import config from '../config/global.config';
import UserModel, { initUserModel } from './models/users.model';
import UserTypeModel, { initUserTypeModel } from './models/user_types.model';
import RoomModel, { initRoomModel } from './models/rooms.model';
import ReserveModel, { initReserveModel } from './models/reserve.model';
import EquipmentInfoModel, { initEquipmentInfoModel } from './models/equipment_infos.model'
import EquipmentsModel, { initEquipmentsModel } from './models/equipments.model'
import RentRateModel, { initRentRateModel } from './models/rent_rate.model';
import ProductionLineModel, { initProductionLineModel } from './models/production_lines.model';
import ReserveEquipmentModel, { initReserveEquipmentModel } from './models/reserve_equipments.model';
import RoomPictureModel, { initRoomPictureModel } from './models/room_pictures.model';
import SupplierModel, { initSupplierModel } from './models/supplier.model';
import SupplyModel, { initSupplyModel } from './models/supply.model';
import { initNewsModel } from './models/news.model';
import AdminModel, { initAdminModel } from './models/admins.model';
import AdminTypeModel, { initAdminTypeModel } from './models/admin_types.model';
import CartModel, { initCartModel } from './models/carts.model';
import NotificationModel, { initNotificationModel } from './models/notifications.model';

import { initWebInfoModel } from './models/web_info.model';
import { initServiceModel } from './models/services.model';
import { initAdminTypeSeed } from '../seeders/admin_types.seed';
import { initUserTypeSeed } from '../seeders/user_types.seed';
import { initRoomSeed } from '../seeders/room.seed';
import { initRoomPictureSeed } from '../seeders/room_picture.seed';
import { initEquipmentInfoSeed } from '../seeders/equipment_info.seed';
import { initServiceSeed } from '../seeders/service.seed';
import { initNewsSeed } from '../seeders/news.seed';
import { initUserSeed } from '../seeders/user.seed';
import { initProductionLineSeed } from '../seeders/production_line.seed';
import { initRentRateSeed } from '../seeders/rent_rates.seed';
import { initEquipmentsSeed } from '../seeders/equipment.seed';

import AdminController from '../controllers/admin.controller';
import log from '../tools/log';
import { initWebInfoSeed } from '../seeders/web_infos.seed';

const logDB = debug('app:db');
const logFunc = config.database.logging ? ((sql: string) => logDB(sql)) : false;

const dbName = config.database.dbname;
const dbUser = config.database.username;
const dbHost = config.database.host;
const dbDriver = config.database.driver as Dialect;
const dbPassword = config.database.password;

const sequelizeOptions: any = {
    host: dbHost,
    dialect: dbDriver,
    logging: logFunc,
    ...config.database.sequelizeOptions,
};
export const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, sequelizeOptions);

sequelizeConnection.authenticate().then(() => {
    log('Connected to database');
}).catch((err) => {
    log(`${err}`);
    console.log(err);
});

const initDatabase = async () => {
    const models = [
        //User
        initUserTypeModel,
        initUserModel,

        initRoomModel,
        initNewsModel,
        initReserveModel,
        initSupplierModel,
        initRentRateModel,
        initProductionLineModel,
        initEquipmentInfoModel,
        initEquipmentsModel,
        initSupplyModel,
        initReserveEquipmentModel,
        initRoomPictureModel,
        initCartModel,
        initNotificationModel,

        //Admin
        initAdminTypeModel,
        initAdminModel,

        //Public
        initWebInfoModel,
        initServiceModel,

    ];
    models.forEach((initFunction) => {
        initFunction(sequelizeConnection);
    });

    UserTypeModel.hasMany(UserModel, { foreignKey: 'type_id' });
    UserModel.belongsTo(UserTypeModel, { foreignKey: 'type_id' });

    UserModel.hasMany(ReserveModel, { foreignKey: 'user_id' });
    ReserveModel.belongsTo(UserModel, { foreignKey: 'user_id' });

    RoomModel.hasMany(ReserveModel, { foreignKey: 'room_id' });
    ReserveModel.belongsTo(RoomModel, { foreignKey: 'room_id' });

    RoomModel.hasMany(RoomPictureModel, { as: 'picture', foreignKey: 'room_id' });
    RoomPictureModel.belongsTo(RoomModel, { as: 'picture', foreignKey: 'room_id' });

    ProductionLineModel.hasMany(EquipmentInfoModel, { as: 'equipments', foreignKey: 'production_line_id' });
    EquipmentInfoModel.belongsTo(ProductionLineModel, { as: 'equipments', foreignKey: 'production_line_id' });

    EquipmentInfoModel.hasMany(EquipmentsModel, { as: 'stock', foreignKey: 'equipment_info_id' });
    EquipmentsModel.belongsTo(EquipmentInfoModel, { as: 'stock', foreignKey: 'equipment_info_id' });

    RentRateModel.hasMany(EquipmentInfoModel, { as: 'rent_rate', foreignKey: 'rent_rate_id' });
    EquipmentInfoModel.belongsTo(RentRateModel, { as: 'rent_rate', foreignKey: 'rent_rate_id' });

    EquipmentsModel.hasMany(ReserveEquipmentModel, { foreignKey: 'equipments_id' });
    ReserveEquipmentModel.belongsTo(EquipmentsModel, { foreignKey: 'equipments_id' });

    EquipmentInfoModel.hasMany(ReserveEquipmentModel, { foreignKey: 'equipment_info_id' });
    ReserveEquipmentModel.belongsTo(EquipmentInfoModel, { foreignKey: 'equipment_info_id' });

    ReserveModel.hasMany(ReserveEquipmentModel, { foreignKey: 'reserve_id' });
    ReserveEquipmentModel.belongsTo(ReserveModel, { foreignKey: 'reserve_id' });

    SupplierModel.hasMany(EquipmentsModel, { foreignKey: 'supplier_id' });
    EquipmentsModel.belongsTo(SupplierModel, { foreignKey: 'supplier_id' });

    SupplierModel.hasMany(SupplyModel, { foreignKey: 'supplier_id' });
    SupplyModel.belongsTo(SupplierModel, { foreignKey: 'supplier_id' });

    EquipmentInfoModel.hasMany(SupplyModel, { foreignKey: 'equipment_info_id' });
    SupplyModel.belongsTo(EquipmentInfoModel, { foreignKey: 'equipment_info_id' });

    AdminTypeModel.hasMany(AdminModel, { foreignKey: 'type_id' });
    AdminModel.belongsTo(AdminTypeModel, { foreignKey: 'type_id' });

    UserModel.hasMany(CartModel, { foreignKey: 'user_id' });
    CartModel.belongsTo(UserModel, { foreignKey: 'user_id' });

    EquipmentInfoModel.hasMany(CartModel, { as: 'equipment', foreignKey: 'equipment_info_id' });
    CartModel.belongsTo(EquipmentInfoModel, { as: 'equipment', foreignKey: 'equipment_info_id' });

    UserModel.hasMany(NotificationModel, { foreignKey: 'user_id' });
    NotificationModel.belongsTo(UserModel, { foreignKey: 'user_id' });

    if (yn(config.database.dropAndCreateNew)) {
        log("Drop status :", config.database.dropAndCreateNew);
        log(sequelizeConnection.models);
        await sequelizeConnection.sync({ force: true });
        if (yn(config.database.insertInitData)) {
            await initAdminTypeSeed();
            await initUserTypeSeed();
            await initUserSeed();
            await initWebInfoSeed();
            await initProductionLineSeed();
            await initRentRateSeed();
            await initRoomSeed();
            await initRoomPictureSeed();
            await initEquipmentInfoSeed();
            await initEquipmentsSeed();
            await initServiceSeed();
            await initNewsSeed();

            await AdminController.createSuperAdmin();
        }
    } else {
        await sequelizeConnection.sync({ alter: config.database.syncOption.alter });
    }
};

export default initDatabase;
