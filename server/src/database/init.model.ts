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
import CartModel, { initCartModel } from './models/carts.model';
import CartItemModel, { initCartItemModel } from './models/cart_items.model';
import UserNotificationModel, { initUserNotificationModel } from './models/user_notifications.model';
import AdminNotificationModel, { initAdminNotificationModel } from './models/admin_notifications.model';
import QuotationModel, { initQuotationModel } from './models/quotations.model';

import { initWebInfoModel } from './models/web_info.model';
import { initServiceModel } from './models/services.model';
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
import { initAdminSeed } from '../seeders/admin.seed';

import log from '../tools/log';
import { initWebInfoSeed } from '../seeders/web_infos.seed';
import { initLogModel } from './models/logs.model';

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
        initCartItemModel,
        initUserNotificationModel,

        //Admin
        initAdminModel,
        initAdminNotificationModel,

        initQuotationModel,

        //Public
        initWebInfoModel,
        initServiceModel,

        //Log
        initLogModel

    ];
    models.forEach((initFunction) => {
        initFunction(sequelizeConnection);
    });

    UserTypeModel.hasMany(UserModel, { as: 'user_type', foreignKey: 'type_id' });
    UserModel.belongsTo(UserTypeModel, { as: 'user_type', foreignKey: 'type_id' });

    UserModel.hasMany(ReserveModel, { as: 'user', foreignKey: 'user_id' });
    ReserveModel.belongsTo(UserModel, { as: 'user', foreignKey: 'user_id' });

    RoomModel.hasMany(ReserveModel, { as: 'room', foreignKey: 'room_id' });
    ReserveModel.belongsTo(RoomModel, { as: 'room', foreignKey: 'room_id' });

    RoomModel.hasMany(RoomPictureModel, { as: 'picture', foreignKey: 'room_id' });
    RoomPictureModel.belongsTo(RoomModel, { as: 'picture', foreignKey: 'room_id' });

    ProductionLineModel.hasMany(EquipmentInfoModel, { as: 'production_line', foreignKey: 'production_line_id' });
    EquipmentInfoModel.belongsTo(ProductionLineModel, { as: 'production_line', foreignKey: 'production_line_id' });

    EquipmentInfoModel.hasMany(EquipmentsModel, { as: 'stock', foreignKey: 'equipment_info_id' });
    EquipmentsModel.belongsTo(EquipmentInfoModel, { as: 'stock', foreignKey: 'equipment_info_id' });

    RentRateModel.hasMany(EquipmentInfoModel, { as: 'rent_rate', foreignKey: 'rent_rate_id' });
    EquipmentInfoModel.belongsTo(RentRateModel, { as: 'rent_rate', foreignKey: 'rent_rate_id' });

    EquipmentsModel.hasMany(ReserveEquipmentModel, { foreignKey: 'equipments_id' });
    ReserveEquipmentModel.belongsTo(EquipmentsModel, { foreignKey: 'equipments_id' });

    EquipmentInfoModel.hasMany(ReserveEquipmentModel, { as: 'equipment_info', foreignKey: 'equipment_info_id' });
    ReserveEquipmentModel.belongsTo(EquipmentInfoModel, { as: 'equipment_info', foreignKey: 'equipment_info_id' });

    ReserveModel.hasMany(ReserveEquipmentModel, { as: 'reserve_equipment', foreignKey: 'reserve_id' });
    ReserveEquipmentModel.belongsTo(ReserveModel, { as: 'reserve_equipment', foreignKey: 'reserve_id' });

    SupplierModel.hasMany(EquipmentsModel, { foreignKey: 'supplier_id' });
    EquipmentsModel.belongsTo(SupplierModel, { foreignKey: 'supplier_id' });

    SupplierModel.hasMany(SupplyModel, { foreignKey: 'supplier_id' });
    SupplyModel.belongsTo(SupplierModel, { foreignKey: 'supplier_id' });

    EquipmentInfoModel.hasMany(SupplyModel, { foreignKey: 'equipment_info_id' });
    SupplyModel.belongsTo(EquipmentInfoModel, { foreignKey: 'equipment_info_id' });

    UserModel.hasOne(CartModel, { foreignKey: 'user_id' });
    CartModel.belongsTo(UserModel, { foreignKey: 'user_id' });

    CartModel.hasMany(CartItemModel, { as: 'cart_items', foreignKey: 'cart_id' });
    CartItemModel.belongsTo(CartModel, { as: 'cart_items', foreignKey: 'cart_id' });

    EquipmentInfoModel.hasMany(CartItemModel, { as: 'equipment', foreignKey: 'equipment_info_id' });
    CartItemModel.belongsTo(EquipmentInfoModel, { as: 'equipment', foreignKey: 'equipment_info_id' });

    UserModel.hasMany(UserNotificationModel, { foreignKey: 'user_id' });
    UserNotificationModel.belongsTo(UserModel, { foreignKey: 'user_id' });

    AdminModel.hasMany(AdminNotificationModel, { foreignKey: 'admin_id' });
    AdminNotificationModel.belongsTo(AdminModel, { foreignKey: 'admin_id' });

    ReserveModel.hasOne(QuotationModel, { as: 'quotation', foreignKey: 'reserve_id' });
    QuotationModel.belongsTo(ReserveModel, { as: 'quotation', foreignKey: 'reserve_id' });

    AdminModel.hasMany(QuotationModel, { as: 'admin', foreignKey: 'admin_id' });
    QuotationModel.belongsTo(AdminModel, { as: 'admin', foreignKey: 'admin_id' });

    if (yn(config.database.dropAndCreateNew)) {
        log("Drop status :", config.database.dropAndCreateNew);
        log(sequelizeConnection.models);
        await sequelizeConnection.sync({ force: true });
        if (yn(config.database.insertInitData)) {
            await initAdminSeed();
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
        }
    } else {
        await sequelizeConnection.sync({ alter: config.database.syncOption.alter });
    }
};

export default initDatabase;
