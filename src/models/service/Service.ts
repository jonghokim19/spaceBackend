import { Column, Comment, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import IService from '../../../common/models/service/IService';

export interface ServiceAttr extends IService {
};

@Table({ tableName: 'Service', charset: 'utf8', updatedAt: false })
export default class Service extends Model<IService> {

    @PrimaryKey
    @Column({ type: DataType.STRING(45), allowNull: false, defaultValue: DataType.UUIDV4 })
    uuid: string;

    @Column({ type: DataType.STRING(45), allowNull: false })
    name: string;

    //------------------------------------
};