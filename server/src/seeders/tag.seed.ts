import TagsModel, { TagsAttribute } from '../database/models/tags.model';

const entries: TagsAttribute[] = [
  {
    tag_id: 1,
    tag_name: 'Education',
  },
  {
    tag_id: 2,
    tag_name: 'Programming',
  },
  {
    tag_id: 3,
    tag_name: 'SQL',
  },
  {
    tag_id: 4,
    tag_name: 'Java',
  },
];

// eslint-disable-next-line import/prefer-default-export
export const initTagSeeder = () => TagsModel.bulkCreate(entries);