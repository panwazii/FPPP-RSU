import RentRate, {RentRateAttribute} from "../database/models/rent_rate.model";
const entries: RentRateAttribute[] = [
    {
        id: 1,
        name: 'ชั่วโมง',
        available_status: true,
    },
    {
        id: 2,
        name: 'วัน',
        available_status: true,
    },
    {
        id: 3,
        name: 'กิโลกรัม',
        available_status: true,
    },
    {
        id: 4,
        name: 'กรัม',
        available_status: true,
    },
];

export const initRentRateSeed = () => RentRate.bulkCreate(entries);