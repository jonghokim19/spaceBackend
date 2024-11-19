import { Request, Response } from 'express';
import CODE from '../../common/code';
import response from '../../common/response';
import BlockIp, { BlockIpAttr } from '../../models/blockIp/BlockIp';
import InternalError from '../../common/InternalError';

export default class BlockIpController {

    // IP 차단하기 또는 해제하기
    static blockIp = async (req: Request, res: Response) => {

        const params: BlockIpAttr = req.body;
        const ipList = params.ip?.split(',').map(ip => ip.trim());
        const isUnblock = typeof params.isUnblock === 'string' ? params.isUnblock === 'true' : !!params.isUnblock;

        try {
            await BlockIp.sequelize?.transaction(async t => {
                const result = [];

                for (const ip of ipList) {
                    const existingBlockIp = await BlockIp.findByPk(ip, { transaction: t });

                    if (isUnblock) {
                        if (existingBlockIp) {
                            await existingBlockIp.destroy({ transaction: t });
                            result.push({ ip, status: 'unblocked' });
                        } else {
                            result.push({ ip, status: 'not found' });
                        }
                    } else {
                        if (existingBlockIp) await existingBlockIp.destroy({ transaction: t });
                        const blockIp = new BlockIp({ ...params, ip });
                        await blockIp.save({ transaction: t });

                        result.push({ ip, status: 'registered' });
                    }
                }

                return response(req, res, CODE.OK, result);
            });
        } catch (error) {
            response(req, res, error);
        }
    }

    //차단 ip 불러오기
    static blockIpList = async (req: Request, res: Response) => {
        try {
            await BlockIp.sequelize?.transaction(async t => {

                const blockIpList = await BlockIp.findAll({ transaction: t });

                if(blockIpList.length <= 0) throw new InternalError(CODE.NoContent, '차단된 IP가 없습니다.');

                return response(req, res, CODE.OK, blockIpList)
            })
        } catch (error) {
            response(req, res, error);
        }
    }
}