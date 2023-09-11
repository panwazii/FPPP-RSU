import WebInfoModel, { WebInfoAttribute } from '../database/models/web_info.model';

const entries: WebInfoAttribute[] = [
    {
        id: 1,
        logo: '',
        banner_picture: '',
        banner_title: '',
        about_picture: '',
        about_title: '',
        about_details: '',
        service_title: '',
        service_details: '',
        contact_email: "test.rsu.ac.th",
        contact_description: '',
        contact_tel: '000-0000000',
        contact_address: '',
        contact_location: '',
    },
];

export const initWebInfoSeed = () => WebInfoModel.bulkCreate(entries);
