import { BelongsTo, Column, Comment, CreatedAt, DataType, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import IInquireService from '../../../common/models/inquireService/IInquireService';
import Service from '../service/Service';
import Inquire from '../inquire/Inquire';

export interface InquireServiceAttr extends IInquireService {
};

@Table({ tableName: 'InquireService', charset: 'utf8', updatedAt: false })
export default class InquireService extends Model<IInquireService> {

    @PrimaryKey
    @ForeignKey(()=> Inquire)
    @Column({ type: DataType.STRING(45), allowNull: false })
    inquireUuid: string;

    @PrimaryKey
    @ForeignKey(()=> Service)
    @Column({ type: DataType.STRING(45), allowNull: false })
    serviceUuid: string;

    //------------------------------------
    @BelongsTo(()=> Inquire, 'inquireUuid')
    inquire: Inquire;

    @BelongsTo(()=> Service, 'serviceUuid')
    service: Service;
};