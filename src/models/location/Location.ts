import IService from '../../../common/models/service/IService';
import { Column, Comment, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';


export interface LocationAttr extends IService {
};

@Table({ tableName: 'Location', charset: 'utf8', updatedAt: false })
export default class Location extends Model<IService> {

    @PrimaryKey
    @Column({ type: DataType.STRING(45), allowNull: false, defaultValue: DataType.UUIDV4 })
    uuid: string;

    @Column({ type: DataType.STRING(45), allowNull: false })
    name: string;

    //------------------------------------
};