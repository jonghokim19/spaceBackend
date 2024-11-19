import { Column, Comment, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import ICounselor from '../../../common/models/counselor/ICounselor';

export interface CounselorAttr extends ICounselor {
    sort?: string;
    firstPhone: string;
    middlePhone: string;
    lastPhone: string;
};

@Table({ tableName: 'Counselor', charset: 'utf8' })
export default class Counselor extends Model<ICounselor> {

    @PrimaryKey
    @Column({ type: DataType.STRING(45), allowNull: false })
    uid: string;

    @Column({ type: DataType.STRING(45), allowNull: false })
    name?: string;

    @Column({ type: DataType.STRING(16), allowNull: false })
    phone?: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    order?: number;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: 1 })
    enable?: boolean;

    @CreatedAt
    @Column({ type: DataType.DATE, allowNull: false })
    createdAt: Date;

    @UpdatedAt
    @Column({ type: DataType.DATE })
    updatedAt?: Date;

    //------------------------------------
};