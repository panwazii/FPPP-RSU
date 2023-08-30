import RoomPictureModel, {RoomPictureAttribute} from "../database/models/room_pictures.model";
import { uuid } from 'uuidv4';
const entries: RoomPictureAttribute[] = [
    {
        id: uuid(),
        url: 'https://www.pimfoodacademy.com/public/userfiles/images/Rooms-Pilot%20Plant%201%201760x920.jpg',
        room_id: '06bddb33-7e5a-476a-942c-cce5cd87f980',
        available_status: true,
    },
    {
        id: uuid(),
        url: 'https://www.pimfoodacademy.com/public/userfiles/images/Rooms-Pilot%20Plant%201%201760x920.jpg',
        room_id: '02f677f8-14b7-4162-98fa-aaa47264258a',
        available_status: true,
    },
    {
        id: uuid(),
        url: 'https://www.pimfoodacademy.com/public/userfiles/images/Rooms-Pilot%20Plant%201%201760x920.jpg',
        room_id: '5fbab7c7-f8bf-40cb-ade6-a357942214d1',
        available_status: true,
    },
];

export const initRoomPictureSeed = () => RoomPictureModel.bulkCreate(entries);
