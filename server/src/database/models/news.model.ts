import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';

export interface NewsAttribute {
    id?: string;
    title?: string;
    details?: string;
    picture?: string;
    available_status?: boolean;
    created_at?: string;
    update_at?: string;
}

export interface NewsAttributeCreation extends Optional<NewsAttribute, 'id'> { }



class NewsModel extends Model<NewsAttribute, NewsAttributeCreation> implements NewsAttribute {
    public id!: string;

    public title!: string;

    public details!: string;

    public picture!: string;

    public available_status!: boolean;
}

export const initNewsModel = (connection: Sequelize) => {
    NewsModel.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            title: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },
            details: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },
            picture: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            available_status: {
                allowNull: false,
                type: DataTypes.BOOLEAN,
            },
        },
        {
            sequelize: connection,
            timestamps: false,
            tableName: 'news',
        },
    );
};

export default NewsModel;
