import { v4 } from "uuid";
import UserModel,{UserAttribute} from "../database/models/users.model";

const entries: UserAttribute[] = [
    {
        id: v4(),
        type_id: 3,
        fname: 'Tester',
        lname: 'NumberOne',
        email: 'tester01@gmail.com',
        password: '$2b$10$kaqSH2r8.EYGXVcKIEBwJ.cbaZAn0PJTj8HQoxTaGYymIRxl5PCl.',
        tel: '0100100100',
        verify_status: true,
        booking_permission: 'NONE',
        available_status: true,
    },
    {
        id: v4(),
        type_id: 1,
        fname: 'Tester',
        lname: 'NumberTwo',
        email: 'tester02@gmail.com',
        password: '$2b$10$kaqSH2r8.EYGXVcKIEBwJ.cbaZAn0PJTj8HQoxTaGYymIRxl5PCl.',
        tel: '0200200200',
        verify_status: true,
        booking_permission: 'NONE',
        available_status: true,
    }
];

export const initUserSeed = () => UserModel.bulkCreate(entries);