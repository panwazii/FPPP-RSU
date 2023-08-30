import EquipmentInfoModel, {EquipmentInfoAttribute} from "../database/models/equipment_infos.model";
import { uuid } from 'uuidv4';
const entries: EquipmentInfoAttribute[] = [
    {
        id: uuid(),
        name: 'Can seamer',
        details: 'อุปกรณ์',
        price: 2000,
        rent_price: 100,
        picture:'https://www.levapack.com/wp-content/uploads/2018/10/s02-img-08.jpg',
        available_status: true,
    },
    {
        id: uuid(),
        name: 'Pin mill',
        details: 'อุปกรณ์',
        price: 2500,
        rent_price: 105,
        picture:'https://cdn.ready-market.com/101/dbd56353//Templates/pic/m/20160420-pm3-knife-type.jpg?v=601a61c6',
        available_status: true,
    },
    {
        id: uuid(),
        name: 'Pasta maker',
        details: 'อุปกรณ์',
        price: 3000,
        rent_price: 110,
        picture:'https://cdn11.bigcommerce.com/s-ihwnd7z21q/images/stencil/1280x1280/products/497/3561/201521_PastaMachine__79400.1642528488.jpg?c=1',
        available_status: true,
    },
];

export const initEquipmentInfoSeed = () => EquipmentInfoModel.bulkCreate(entries);
