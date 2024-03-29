import {
    Model, Optional, Sequelize, DataTypes,
} from 'sequelize';
import UserModel from './users.model';
import EquipmentInfoModel from './equipment_infos.model';

export interface ReportAttribute {
    id?: string;
    user_id?: string;
    equipment_info_id?: string;
    desc?: string;
    fix_status?: boolean;
    created_at?: Date;
    update_at?: Date;
}

export interface ReportAttributeCreation extends Optional<ReportAttribute, 'id'> { }



class ReportModel extends Model<ReportAttribute, ReportAttributeCreation> implements ReportAttribute {
    declare id: string;

    declare user_id: string;

    declare equipment_info_id: string;

    declare desc: string;

    declare fix_status: boolean;
}

export const initReportModel = (connection: Sequelize) => {
    ReportModel.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: UserModel,
                    key: 'id',
                },
            },
            equipment_info_id: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: EquipmentInfoModel,
                    key: 'id',
                },
            },
            desc: {
                allowNull: false,
                type: DataTypes.TEXT,
            },
            fix_status: {
                allowNull: false,
                type: DataTypes.BOOLEAN,
            },
        },
        {
            paranoid: true,
            sequelize: connection,
            timestamps: false,
            tableName: 'report',
        },
    );
};

export default ReportModel;
