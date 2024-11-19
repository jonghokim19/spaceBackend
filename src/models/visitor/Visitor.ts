import IVisitor from '../../../common/models/visitor/IVisitor';
import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

export interface VisitorAttr extends IVisitor {
    startDate: string;
    endDate: string;
    visitor: string;
};

@Table({ tableName: 'Visitor', charset: 'utf8', updatedAt: false })
export default class Visitor extends Model<IVisitor> {

    @PrimaryKey
    @Column({ type: DataType.STRING(45), allowNull: false, defaultValue: DataType.UUIDV4 })
    uuid: string;

    @Column({ type: DataType.STRING(45)})
    ip?: string;

    @Column({ type: DataType.STRING(45) })
    os?: string;

    @Column({ type: DataType.STRING(45)})
    device?: string;

    @Column({ type: DataType.STRING(45)})
    searchEngine?: string;

    @Column({ type: DataType.STRING(128)})
    searchKeyword?: string;

    @Column({ type: DataType.DATE, allowNull: false })
    createdAt: Date;

    //------------------------------------
};