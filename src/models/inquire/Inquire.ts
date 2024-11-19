import { Column, Comment, CreatedAt, DataType, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import IInquire from '../../../common/models/inquire/IInquire';
import InquireService from '../inqureService/InquireService';

export interface InquireAttr extends IInquire {
    services: string[] | string;
    firstPhone: string;
    middlePhone: string;
    lastPhone: string;
    startDate: Date;
    endDate: Date
    dateFilter: string;
};

@Table({ tableName: 'Inquire', charset: 'utf8', updatedAt: false })
export default class Inquire extends Model<IInquire> {

    @PrimaryKey
    @Column({ type: DataType.STRING(45), allowNull: false, defaultValue: DataType.UUIDV4 })
    uuid: string;

    @Comment('고객명 또는 업체명')
    @Column({ type: DataType.STRING(45), allowNull: false })
    name: string;

    @Comment('지역 id')
    @Column({ type: DataType.STRING(45), allowNull: false })
    locationUuid: string;

    @Comment('고객 전화번호')
    @Column({ type: DataType.STRING(11), allowNull: false })
    clientPhone: string;

    @Comment('세부내용')
    @Column({ type: DataType.TEXT })
    content?: string;

    @Comment('개인정보 이용 및 수집 동의 여부')
    @Column({ type: DataType.BOOLEAN, allowNull: false })
    privacyConsent: boolean;

    @Comment('접속기기')
    @Column({ type: DataType.STRING(45), allowNull: false })
    device: string;

    @Comment('접속 ip')
    @Column({ type: DataType.STRING(45), allowNull: false })
    ip: string;

    @Comment('상담사 id')
    @Column({ type: DataType.STRING(45), allowNull: false })
    counselorUid: string;

    @Comment('등록일')
    @CreatedAt
    @Column({ type: DataType.DATE, allowNull: false })
    createdAt: Date;

    //------------------------------------
    @HasMany(()=> InquireService, 'inquireUuid')
    inquireService: InquireService[];
};