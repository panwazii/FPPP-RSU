import { Dialect, Sequelize } from 'sequelize';
import debug from 'debug';
import config from '../config/global.config';
import { initUserModel } from './models/users.model';
import { initRoomModel } from './models/rooms.model';
import { initReserveModel } from './models/reserve.model';
import { initNewsModel } from './models/news.model';
import { initEquipmentModel } from './models/equipments.model';
import { initGlobalEquipmentModel } from './models/global_equipments.model';
import { initAdminModel } from './models/admins.model';
import { initSuperAdminModel } from './models/super_admins.model';
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

    if (config.database.dropAndCreateNew == true) {
        log("Drop status :", config.database.dropAndCreateNew);
        log(sequelizeConnection.models);
        await sequelizeConnection.sync({ force: true });
        if (config.database.insertInitData == true) {
            log("Init on");
            await SuperAdminController.createSuperAdmin();
            // await initSuperAdminSeeder();
        }
    } else {
        await sequelizeConnection.sync(config.database.syncOption);
    }
};

export default initDatabase;
