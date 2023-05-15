import AdminTypeModel, { AdminTypeAttribute } from '../database/models/admin_types.model';
const entries: AdminTypeAttribute[] = [
    {
        id: 1,
        name: 'super admin',
    },
    {
        id: 2,
        name: 'admin',
    },
];

export const initAdminTypeSeed = () => AdminTypeModel.bulkCreate(entries);
