import UserTypeModel, { UserTypeAttribute } from 'database/models/user_types.model';
const entries: UserTypeAttribute[] = [
    {
        id: 1,
        name: 'student',
    },
    {
        id: 2,
        name: 'teacher',
    },
    {
        id: 3,
        name: 'guest',
    },
];

export const initUserTypeSeed = () => UserTypeModel.bulkCreate(entries);
