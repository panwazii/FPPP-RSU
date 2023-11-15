import { v4 } from "uuid";
import ServiceModel, {ServiceAttribute} from "../database/models/services.model";
const entries: ServiceAttribute[] = [
    {
        id: v4(),
        title: 'จองห้อง',
        details: 'บริการจองห้อง',
        picture:'https://upload.wikimedia.org/wikipedia/commons/5/5f/CSIRO_ScienceImage_1319_Food_Science_Australia.jpg',
        available_status: true,
    },
    {
        id: v4(),
        title: 'ผลิต',
        details: 'บริการรับผลิต',
        picture:'https://www.tycoonstory.com/wp-content/uploads/2022/09/20-Profitable-Food-Manufacturing-Business-Ideas-with-Low-investment-in-2022-Tycoonstory.jpg',
        available_status: true,
    },
    {
        id: v4(),
        title: 'ปรึกษา',
        details: 'บริการให้คำปรึกษา',
        picture:'https://tabunka.minamilounge.com/tha/images/minamilounge/multicultural/foreigner/image_01.png',
        available_status: true,
    },
];

export const initServiceSeed = () => ServiceModel.bulkCreate(entries);
