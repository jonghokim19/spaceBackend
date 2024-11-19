import { Column, Comment, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import IBottomInfo from '../../../common/models/bottomInfo/IBottomInfo';

export interface BottomInfoAttr extends IBottomInfo {
};

@Table({ tableName: 'BottomInfo', charset: 'utf8' })
export default class BottomInfo extends Model<IBottomInfo> {

    @PrimaryKey
    @Column({ type: DataType.STRING(45), allowNull: false, defaultValue: DataType.UUIDV4 })
    uuid: string;

    @Column({ type: DataType.TEXT, allowNull: false })
    text: string;

    @CreatedAt
    @Column({ type: DataType.DATE, allowNull: false })
    createdAt: Date;

    @UpdatedAt
    @Column({ type: DataType.DATE })
    updatedAt: Date;

    //------------------------------------
};