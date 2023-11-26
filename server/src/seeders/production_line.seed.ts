import ProductionLineModel, {ProductionLineAttribute} from "../database/models/production_lines.model";
const entries: ProductionLineAttribute[] = [
    {
        id: 1,
        name: 'ไลน์แปรรูปนม',
        available_status: true,
    },
    {
        id: 2,
        name: 'ไลน์แมน',
        available_status: true,
    },
    {
        id: 3,
        name: 'ไลน์เรนเจอร์',
        available_status: true,
    },
    {
        id: 4,
        name: 'ไลน์คุกกี้รัน',
        available_status: true,
    },
];

export const initProductionLineSeed = () => ProductionLineModel.bulkCreate(entries);