import UserTypeModel, { UserTypeAttribute } from '../database/models/user_types.model';
const entries: UserTypeAttribute[] = [
    {
        id: 1,
        name: 'นักศีกษา',
    },
    {
        id: 2,
        name: 'บุคลากร',
    },
    {
        id: 3,
        name: 'บุคลากรภายนอก',
    },
];

export const initUserTypeSeed = () => UserTypeModel.bulkCreate(entries);
