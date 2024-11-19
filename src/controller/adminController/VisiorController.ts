import { Request, Response } from 'express';
import { Op, Sequelize, col } from 'sequelize';
import { Fn } from 'sequelize/types/utils';
import ModelHelper from '../../common/ModelHelper';
import { findOptions } from '../../common/bqparam';
import CODE from '../../common/code';
import response from '../../common/response';
import Visitor, { VisitorAttr } from '../../models/visitor/Visitor';

export default class HomeController {

    // 방문자 리스트
    static visitorList = async (req: Request, res: Response) => {

        const params: VisitorAttr = req.body;
        const visitorType = params.visitor || 'ip';

        try {
            await Visitor.sequelize?.transaction(async t => {

                // 날짜 필터링 조건 설정
                const where: any = {};

                if (params.startDate) {
                    const startDate = new Date(params.startDate);
                    startDate.setHours(0, 0, 0, 0);
                    where.createdAt = { [Op.gte]: startDate };
                }

                if (params.endDate) {
                    const endDate = new Date(params.endDate);
                    endDate.setHours(23, 59, 59, 999);
                    where.createdAt = {
                        ...where.createdAt,
                        [Op.lte]: endDate
                    };
                }

                // 그룹화 필드 설정
                let groupByField: Fn | string = ''; // 기본값 설정
                let alias: string = '';

                if (visitorType === 'os' || visitorType === 'device' || visitorType === 'ip') {
                    groupByField = visitorType;
                    alias = visitorType;
                } else if (visitorType === 'year') {
                    groupByField = Sequelize.fn('YEAR', col('createdAt'));
                    alias = 'year';
                } else if (visitorType === 'month') {
                    groupByField = Sequelize.fn('DATE_FORMAT', col('createdAt'), '%Y-%m');
                    alias = 'month';
                } else if (visitorType === 'day') {
                    groupByField = Sequelize.fn('DATE_FORMAT', col('createdAt'), '%Y-%m-%d');
                    alias = 'day';
                } else if (visitorType === 'week') {
                    groupByField = Sequelize.fn('DATE_FORMAT', col('createdAt'), '%W');
                    alias = 'week';
                } else {
                    return response(req, res, CODE.BadRequest, "Invalid 'visitor' parameter. Use 'os', 'device', 'year', 'month', 'week', or 'day'.");
                }

                const visitorList = await ModelHelper.findRetrieveCountAll(Visitor, req, findOptions(req, {
                    where,
                    attributes: [
                        [groupByField, alias],
                        [Sequelize.fn('COUNT', '*'), 'count']
                    ],
                    group: [groupByField],
                    transaction: t
                }));

                if (visitorType === 'week') {
                    const allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                    const visitorData = visitorList.rows.reduce((acc: any, item: any) => {
                        acc[item.dataValues[alias]] = item.dataValues.count;
                        return acc;
                    }, {});

                    const completedVisitorList = allDays.map(day => ({
                        week: day,
                        count: visitorData[day] || null
                    }));

                    return response(req, res, CODE.OK, completedVisitorList);
                }

                return response(req, res, CODE.OK, { rows: visitorList.rows, count: visitorList.count });
            });
        } catch (error) {
            response(req, res, error);
        }
    };
}
