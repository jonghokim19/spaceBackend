import { Column, Comment, CreatedAt, DataType, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import ISetting from '../../../common/models/setting/ISetting';
import User from '../user/User';

export interface SettingAttr extends ISetting {
};

@Table({ tableName: 'Setting', charset: 'utf8' })
export default class Setting extends Model<ISetting> {

    @PrimaryKey
    @Column({ type: DataType.STRING(45), allowNull: false, defaultValue: DataType.UUIDV4 })
    uuid: string;

    @Column({ type: DataType.TEXT, allowNull: false })
    title: string;

    @ForeignKey(()=> User)
    @Column({ type: DataType.TEXT })
    admin?: string;

    @CreatedAt
    @Column({ type: DataType.DATE, allowNull: false })
    createdAt: Date;

    @UpdatedAt
    @Column({ type: DataType.DATE })
    updatedAt: Date;

    //------------------------------------
};