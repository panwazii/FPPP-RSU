import { v4 } from "uuid";
import EquipmentsModel, {EquipmentsAttribute} from "../database/models/equipments.model";

const entries: EquipmentsAttribute[] = [
    {
        id: v4(),
        serial_number: 'c31d45bc-9470-4b5a-b474-4a1fb4bb8e43',
        price: 2000,
        room_id: '06bddb33-7e5a-476a-942c-cce5cd87f980',
        equipment_info_id: '0ca76aa8-403c-4ba1-bd41-92893645b514',
        equipment_status: 'available',
        available_status: true,
    },
    {
        id: v4(),
        serial_number: '059b299c-f229-4487-ac0d-3b9f3701eaeb',
        price: 2000,
        room_id: '02f677f8-14b7-4162-98fa-aaa47264258a',
        equipment_info_id: 'd57ca094-cef1-49aa-b2ae-da89653a7155',
        equipment_status: 'available',
        available_status: true,
    },
    {
        id: v4(),
        serial_number: '92ec143e-eaf5-453e-831c-33ff093d3e8c',
        price: 2000,
        room_id: '06bddb33-7e5a-476a-942c-cce5cd87f980',
        equipment_info_id: 'd57ca094-cef1-49aa-b2ae-da89653a7155',
        equipment_status: 'available',
        available_status: true,
    },
    {
        id: v4(),
        serial_number: '2595b26c-355c-445d-9a79-d730e58c981e',
        price: 2000,
        room_id: '06bddb33-7e5a-476a-942c-cce5cd87f980',
        equipment_info_id: '8d533d89-5983-4e82-b3a9-b34784c96778',
        equipment_status: 'available',
        available_status: true,
    },
    {
        id: v4(),
        serial_number: '27cdff57-8b93-4223-a882-23d60d56500e',
        price: 2000,
        room_id: '5fbab7c7-f8bf-40cb-ade6-a357942214d1',
        equipment_info_id: '0ca76aa8-403c-4ba1-bd41-92893645b514',
        equipment_status: 'available',
        available_status: true,
    },
    {
        id: v4(),
        serial_number: '5394ea81-e7ed-4d53-9b97-303b254aae0c',
        price: 2000,
        room_id: '02f677f8-14b7-4162-98fa-aaa47264258a',
        equipment_info_id: '8d533d89-5983-4e82-b3a9-b34784c96778',
        equipment_status: 'available',
        available_status: true,
    },
];

export const initEquipmentsSeed = () => EquipmentsModel.bulkCreate(entries);
