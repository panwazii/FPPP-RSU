import NewsModel, {NewsAttribute} from "../database/models/news.model";
import { uuid } from 'uuidv4';
const entries: NewsAttribute[] = [
    {
        id: uuid(),
        title: 'Compliances in food processing sector to be further reduced: Union minister Prah',
        details: 'The government is focusing on reducing compliances further to promote the food.',
        picture: 'https://etimg.etb2bimg.com/photo/94216498.cms',
        available_status: true,
    },
    {
        id: uuid(),
        title: 'Food Processing, Technology and Safety',
        details: 'The Food Processing, Technology and Safety certificate program trains students on the processes and technologies used to convert commodities into consumable food products.',
        picture: 'https://www.canr.msu.edu/iat/images/GreenRed_Peppers.jpg',
        available_status: true,
    },
    {
        id: uuid(),
        title: 'Different Types and methods involved in Food Processing',
        details: 'Generally speaking, food processing is defined as a technique used for turning various foods into separate food products. This method will highly involve different processes within the food development industries. Some of these methods will include sorting & grading, washing, pasteurizing, fermenting, freezing, packaging and so much more.',
        picture: 'https://www.ficsi.in/blog/wp-content/uploads/2022/09/September-blog-1.jpg',
        available_status: true,
    },
];

export const initNewsSeed = () => NewsModel.bulkCreate(entries);