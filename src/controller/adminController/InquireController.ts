import dayjs from "dayjs";
import { Request, Response } from 'express';
import { Op, WhereOptions } from 'sequelize';
import { roleType } from '../../../common/models/user/IUser';
import { findOptions } from '../../common/bqparam';
import CODE from '../../common/code';
import InternalError from '../../common/InternalError';
import ModelHelper from '../../common/ModelHelper';
import response from '../../common/response';
import Counselor from '../../models/counselor/Counselor';
import Inquire, { InquireAttr } from '../../models/inquire/Inquire';

export default class InquireController {

    // 문의내역 리스트
    static inquireList = async (req: Request, res: Response) => {

        const role = res.locals.payload?.role;
        const params: InquireAttr = req.body;

        let whereClauses: WhereOptions = {};

        // 문의자 이름
        if (params.name) {
            whereClauses = {
                ...whereClauses,
                name: { [Op.substring]: params.name }
            };
        }

        // 상담사 이름
        if (params.counselorUid) {
            whereClauses = {
                ...whereClauses,
                counselorUid: { [Op.substring]: params.counselorUid }
            };
        }

        // createdAt 날짜 조건 설정
        if (params.dateFilter) {
            const today = dayjs().startOf("day");
            const startOfWeek = dayjs().startOf("week");
            const startOfMonth = dayjs().startOf("month");

            switch (params.dateFilter) {
                case "today":
                    whereClauses = {
                        ...whereClauses,
                        createdAt: { [Op.gte]: today.toDate() }
                    };
                    break;
                case "yesterday":
                    whereClauses = {
                        ...whereClauses,
                        createdAt: {
                            [Op.between]: [
                                today.subtract(1, "day").toDate(),
                                today.subtract(1, "second").toDate()
                            ]
                        }
                    };
                    break;
                case "thisWeek":
                    whereClauses = {
                        ...whereClauses,
                        createdAt: { [Op.gte]: startOfWeek.toDate() }
                    };
                    break;
                case "thisMonth":
                    whereClauses = {
                        ...whereClauses,
                        createdAt: { [Op.gte]: startOfMonth.toDate() }
                    };
                    break;
                case "lastWeek":
                    whereClauses = {
                        ...whereClauses,
                        createdAt: {
                            [Op.between]: [
                                startOfWeek.subtract(1, "week").toDate(),
                                startOfWeek.subtract(1, "second").toDate()
                            ]
                        }
                    };
                    break;
                case "lastMonth":
                    whereClauses = {
                        ...whereClauses,
                        createdAt: {
                            [Op.between]: [
                                startOfMonth.subtract(1, "month").toDate(),
                                startOfMonth.subtract(1, "second").toDate()
                            ]
                        }
                    };
                    break;
                default:
                    // 전체 기간을 조회할 경우에는 조건을 추가하지 않습니다.
                    break;
            }
        }

        // startDate와 endDate 조건이 있는 경우
        if (params.startDate && params.endDate) {
            const startDate = dayjs(params.startDate).startOf("day").toDate();
            const endDate = dayjs(params.endDate).endOf("day").toDate();

            whereClauses = {
                ...whereClauses,
                createdAt: {
                    [Op.between]: [startDate, endDate]
                }
            };
        }

        try {
            await Inquire.sequelize?.transaction(async t => {

                if (role !== roleType.SYSTEM) throw new InternalError(CODE.Auth.Unauthorized, '조회 권한이 없습니다.');

                const inquireList = await ModelHelper.findRetrieveCountAll(Inquire, req, findOptions(req, {
                    where: whereClauses,
                    order: [['createdAt', 'desc']],
                    transaction: t
                }))

                const responseData = await Promise.all(inquireList.rows.map(async inquire => {

                    //상담사 이름 추출
                    const counselor = await Counselor.findOne({ where: { uid: inquire.counselorUid } });

                    return {
                        uuid: inquire.uuid,
                        receptionTime: inquire.createdAt,
                        device: inquire.device,
                        ip: inquire.ip,
                        name: inquire.name,
                        clientPhone: inquire.clientPhone,
                        counselorInfo: {
                            uid: inquire.counselorUid,
                            name: counselor?.name,
                            phone: counselor?.phone,
                            order: counselor?.order
                        }
                    }
                }));

                return response(req, res, CODE.OK, { rows: responseData, count: inquireList.count })
            })
        } catch (error) {
            response(req, res, error);
        }
    };
}