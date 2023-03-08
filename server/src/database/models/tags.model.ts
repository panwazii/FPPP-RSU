import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';

export interface TagsAttribute {
    tag_id?: number;
    tag_name?: string;
}

export interface TagsAttributeCreation extends Optional<TagsAttribute, 'tag_id'> { }

class TagsModel extends Model<TagsAttribute, TagsAttributeCreation>
    implements TagsAttribute {
    public tag_id!: number;

    public tag_name!: string;
}

export const initTagsModel = (connection: Sequelize) => {
    TagsModel.init({
        tag_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        tag_name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
    }, {
        sequelize: connection,
        tableName: "tags",
    });
};

export default TagsModel;