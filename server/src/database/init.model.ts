import { Dialect, Sequelize } from 'sequelize';
import yn from 'yn';
import debug from 'debug';
import config from '../config/global.config';
import { initUserModel } from './models/users.model';
import { initUserTypeModel } from './models/user_types.model';
import { initRoomModel } from './models/rooms.model';
import ReserveModel, { initReserveModel } from './models/reserve.model';
import { initNewsModel } from './models/news.model';
import { initEquipmentModel } from './models/equipments.model';
import { initGlobalEquipmentModel } from './models/global_equipments.model';
import { initAdminModel } from './models/admins.model';
import { initSuperAdminModel } from './models/super_admins.model';

import UserModel from './models/users.model';
import UserTypeModel from './models/user_types.model';
import RoomModel from './models/rooms.model';
import EquipmentModel from './models/equipments.model';

import SuperAdminController from '../controllers/super_admin.controller';
import log from '../tools/log';

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
        initUserTypeModel,
        initUserModel,

        initRoomModel,
        initNewsModel,
        initGlobalEquipmentModel,
        initReserveModel,
        initEquipmentModel,
        initAdminModel,
        initSuperAdminModel
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

    if (yn(config.database.dropAndCreateNew)) {
        log("Drop status :", config.database.dropAndCreateNew);
        log(sequelizeConnection.models);
        await sequelizeConnection.sync({ force: true });
        if (yn(config.database.insertInitData)) {
            await SuperAdminController.createSuperAdmin();
            // await initSuperAdminSeeder();
        }
    } else {
        await sequelizeConnection.sync({ alter: config.database.syncOption.alter });
    }
};

export default initDatabase;
