import { Column, CreatedAt, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
import IBlockIp from '../../../common/models/blockIp/IBlockIp';

export interface BlockIpAttr extends IBlockIp {
    isUnblock?: boolean;
};

@Table({ tableName: 'BlockIp', charset: 'utf8', updatedAt:false })
export default class BlockIp extends Model<IBlockIp> {

    @PrimaryKey
    @Column({ type: DataType.STRING(45), allowNull: false })
    ip: string;

    @CreatedAt
    @Column({ type: DataType.DATE, allowNull: false })
    createdAt: Date;

    //------------------------------------
};