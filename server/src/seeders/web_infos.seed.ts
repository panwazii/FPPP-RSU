import WebInfoModel, { WebInfoAttribute } from 'database/models/web_info.model';
import { uuid } from 'uuidv4';
const entries: WebInfoAttribute[] = [
    {
        id: uuid(),
        details: 'super admin',
        email: "",
        tel: 'super admin',
        location: 'super admin',

    },
];

export const initWebInfoSeed = () => WebInfoModel.bulkCreate(entries);
