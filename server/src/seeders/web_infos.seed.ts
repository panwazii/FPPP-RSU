import WebInfoModel, { WebInfoAttribute } from 'database/models/web_info.model';
import { uuid } from 'uuidv4';
const entries: WebInfoAttribute[] = [
    {
        id: 1,
        details: '',
        email: "test.rsu.ac.th",
        tel: '000-0000000',
        location: '',
    },
];

export const initWebInfoSeed = () => WebInfoModel.bulkCreate(entries);
