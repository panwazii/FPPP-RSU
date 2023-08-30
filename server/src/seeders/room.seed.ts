import RoomModel, {RoomAttribute} from "../database/models/rooms.model";
import { uuid } from 'uuidv4';
const entries: RoomAttribute[] = [
    {
        id: '06bddb33-7e5a-476a-942c-cce5cd87f980',
        name: 'P102',
        details: 'ห้อง',
        rent_price: 100,
        available_status: true,
    },
    {
        id: '02f677f8-14b7-4162-98fa-aaa47264258a',
        name: 'P103',
        details: 'ห้อง',
        rent_price: 105,
        available_status: true,
    },
    {
        id: '5fbab7c7-f8bf-40cb-ade6-a357942214d1',
        name: 'P104',
        details: 'ห้อง',
        rent_price: 110,
        available_status: true,
    },
];

export const initRoomSeed = () => RoomModel.bulkCreate(entries);
