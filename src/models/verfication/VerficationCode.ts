import { BelongsTo, Column, Comment, CreatedAt, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import IVerificationCode, { statusType } from '../../../common/models/verificationCode/IVerificationCode';
import User from '../user/User';

export interface VerificationCodeAttr extends IVerificationCode {
};

@Table({ tableName: 'VerificationCode', charset: 'utf8', updatedAt: false })
export default class VerificationCode extends Model<IVerificationCode> {

    @PrimaryKey
    @Column({ type: DataType.STRING(45), allowNull: false, defaultValue: DataType.UUIDV4 })
    uuid: string;

    @Comment('인증상태')
    @Column({ type: DataType.ENUM('PROGRESS', 'COMPLETE') })
    status?: statusType;

    @Comment('인증번호')
    @Column({ type: DataType.STRING(12), allowNull: false })
    code: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.STRING(45) })
    uid?: string;

    @Comment('만료일시(인증 완료시 만료 처리하여 재사용 불가)')
    @Column({ type: DataType.DATE, allowNull: false })
    expireAt: Date;

    @Comment('등록일')
    @CreatedAt
    @Column({ type: DataType.DATE, allowNull: false })
    createdAt: Date;

    //------------------------------------
    @BelongsTo(() => User, 'uid')
    user?: User;
};