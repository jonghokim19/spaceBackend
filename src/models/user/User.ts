import { Column, Comment, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import IUser, { roleType } from '../../../common/models/user/IUser';

export interface UserAttr extends IUser {
};

@Table({ tableName: 'User', charset: 'utf8' })
export default class User extends Model<IUser> {

    @PrimaryKey
    @Column({ type: DataType.STRING(45), allowNull: false })
    uid: string;

    @Column({ type: DataType.ENUM('ADMIN', 'SYSTEM'), allowNull: false })
    role: roleType;

    @Column({ type: DataType.STRING(45) })
    name?: string;

    @Column({ type: DataType.STRING(128) })
    email?: string;

    @Column({ type: DataType.STRING(45) })
    password?: string;

    @Column({ type: DataType.STRING(16) })
    phone?: string;

    @CreatedAt
    @Column({ type: DataType.DATE, allowNull: false })
    createdAt: Date;

    @UpdatedAt
    @Column({ type: DataType.DATE })
    updatedAt?: Date;

    //------------------------------------
};