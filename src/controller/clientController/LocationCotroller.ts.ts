import { Request, Response } from 'express';
import CODE from '../../common/code';
import InternalError from '../../common/InternalError';
import response from '../../common/response';
import Location, { LocationAttr } from '../../models/location/Location';
import { Sequelize } from 'sequelize';

export default class LocationController {

    // 지역 리스트
    static locationList = async (req: Request, res: Response) => {

        const params: LocationAttr = req.body;

        try {
            await Location.sequelize?.transaction(async t => {

                const location = await Location.findAll({
                    order: [[Sequelize.literal('CAST(uuid AS UNSIGNED)'), 'ASC']],
                    transaction: t
                });

                if (location.length <= 0) throw new InternalError(CODE.NoContent, '등록된 지역이 없습니다.');

                return response(req, res, CODE.OK, location);
            })
        } catch (error) {
            response(req, res, error);
        }
    };
}