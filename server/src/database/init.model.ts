import { Dialect, Sequelize } from 'sequelize';
import yn from 'yn';
import debug from 'debug';
import config from '../config/global.config';
import UserModel, { initUserModel } from './models/users.model';
import UserTypeModel, { initUserTypeModel } from './models/user_types.model';
import RoomModel, { initRoomModel } from './models/rooms.model';
import ReserveModel, { initReserveModel } from './models/reserve.model';
import EquipmentModel, { initEquipmentModel } from './models/equipments.model';
import EquipmentInfoModel, { initEquipmentInfoModel } from './models/equipment_infos.model'
import EquipmentStockModel, { initEquipmentStockModel } from './models/equipment_stocks.model'
import EquipmentRentRateModel, { initEquipmentRentRateModel } from './models/equipment_rent_rates.model';
import ProductionLineModel, { initProductionLineModel } from './models/production_lines.model';
import ReserveEquipmentModel, { initReserveEquipmentModel } from './models/reserve_equipments.model';
import RoomPictureModel, { initRoomPictureModel } from './models/room_pictures.model';
import SupplierModel, { initSupplierModel } from './models/supplier.model';
import SupplyStockModel, { initSupplyStockModel } from './models/supply_stock.model';
import { initNewsModel } from './models/news.model';
import { initGlobalEquipmentModel } from './models/global_equipments.model';
import AdminModel, { initAdminModel } from './models/admins.model';
import AdminTypeModel, { initAdminTypeModel } from './models/admin_types.model';
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
        initGlobalEquipmentModel,
        initReserveModel,
        initSupplierModel,
        initEquipmentModel,
        initEquipmentRentRateModel,
        initProductionLineModel,
        initEquipmentInfoModel,
        initEquipmentStockModel,
        initSupplyStockModel,
        initReserveEquipmentModel,
        initRoomPictureModel,

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

    RoomModel.hasMany(EquipmentModel, { foreignKey: 'room_id' });
    EquipmentModel.belongsTo(RoomModel, { foreignKey: 'room_id' });

    RoomModel.hasMany(RoomPictureModel, { as: 'Picture', foreignKey: 'room_id' });
    RoomPictureModel.belongsTo(RoomModel, { as: 'Picture', foreignKey: 'room_id' });

    RoomModel.hasMany(EquipmentModel, { foreignKey: 'room_id' });
    EquipmentModel.belongsTo(RoomModel, { foreignKey: 'room_id' });

    ProductionLineModel.hasMany(EquipmentInfoModel, { as: 'Equipments', foreignKey: 'production_line_id' });
    EquipmentInfoModel.belongsTo(ProductionLineModel, { as: 'Equipments', foreignKey: 'production_line_id' });

    EquipmentInfoModel.hasMany(EquipmentStockModel, { as: 'Stock', foreignKey: 'equipment_info_id' });
    EquipmentStockModel.belongsTo(EquipmentInfoModel, { as: 'Stock', foreignKey: 'equipment_info_id' });

    EquipmentRentRateModel.hasMany(EquipmentInfoModel, { foreignKey: 'equipment_rent_rate_id' });
    EquipmentInfoModel.belongsTo(EquipmentRentRateModel, { foreignKey: 'equipment_rent_rate_id' });

    EquipmentStockModel.hasMany(ReserveEquipmentModel, { foreignKey: 'equipment_stock_id' });
    ReserveEquipmentModel.belongsTo(EquipmentStockModel, { foreignKey: 'equipment_stock_id' });

    EquipmentInfoModel.hasMany(ReserveEquipmentModel, { foreignKey: 'equipment_info_id' });
    ReserveEquipmentModel.belongsTo(EquipmentInfoModel, { foreignKey: 'equipment_info_id' });

    ReserveModel.hasMany(ReserveEquipmentModel, { foreignKey: 'reserve_id' });
    ReserveEquipmentModel.belongsTo(ReserveModel, { foreignKey: 'reserve_id' });

    SupplierModel.hasMany(EquipmentStockModel, { foreignKey: 'supplier_id' });
    EquipmentStockModel.belongsTo(SupplierModel, { foreignKey: 'supplier_id' });

    SupplierModel.hasMany(SupplyStockModel, { foreignKey: 'supplier_id' });
    SupplyStockModel.belongsTo(SupplierModel, { foreignKey: 'supplier_id' });

    EquipmentInfoModel.hasMany(SupplyStockModel, { foreignKey: 'supply_stock_id' });
    SupplyStockModel.belongsTo(EquipmentInfoModel, { foreignKey: 'supply_stock_id' });

    AdminTypeModel.hasMany(AdminModel, { foreignKey: 'type_id' });
    AdminModel.belongsTo(AdminTypeModel, { foreignKey: 'type_id' });

    if (yn(config.database.dropAndCreateNew)) {
        log("Drop status :", config.database.dropAndCreateNew);
        log(sequelizeConnection.models);
        await sequelizeConnection.sync({ force: true });
        if (yn(config.database.insertInitData)) {
            await initAdminTypeSeed();
            await initUserTypeSeed();
            await initUserSeed();
            await initWebInfoSeed();
            await initRoomSeed();
            await initRoomPictureSeed();
            await initEquipmentInfoSeed();
            await initServiceSeed();
            await initNewsSeed();
            
            await AdminController.createSuperAdmin();
        }
    } else {
        await sequelizeConnection.sync({ alter: config.database.syncOption.alter });
    }
};

export default initDatabase;
