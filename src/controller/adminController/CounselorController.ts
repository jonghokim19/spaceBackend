import { Request, Response } from 'express';
import { IVerifyOptions } from 'passport-local';
import { roleType } from '../../../common/models/user/IUser';
import CODE from '../../common/code';
import InternalError from '../../common/InternalError';
import response from '../../common/response';
import ModelHelper from '../../common/ModelHelper';
import { findOptions } from '../../common/bqparam';
import { Op, WhereOptions } from 'sequelize';
import Counselor, { CounselorAttr } from '../../models/counselor/Counselor';
import { validatePhoneNumber } from '../../common/phoneValidator';

export default class CounselorController {

    // 전체 조회
    static counselorList = async (req: Request, res: Response) => {

        const params: CounselorAttr = req.body;

        let whereClauses: WhereOptions | any = {
        }

        if (params.name) {
            whereClauses = Object.assign(whereClauses, {
                name: { [Op.substring]: params.name }
            });
        }

        if (params.uid) {
            whereClauses = Object.assign(whereClauses, {
                uid: { [Op.eq]: params.uid }
            });
        }

        let orderCondition: any[] = [];

        if (params.sort === 'orderAsc') {
            orderCondition.push(['order', 'asc'])
        } else if (params.sort === 'orderDesc') {
            orderCondition.push(['order', 'desc'])
        } else if (params.sort === 'nameAsc') {
            orderCondition.push(['name', 'asc'])
        } else if (params.sort === 'nameDesc') {
            orderCondition.push(['name', 'desc'])
        } else if (params.sort === 'uidAsc') {
            orderCondition.push(['uid', 'asc'])
        } else if (params.sort === 'uidDesc') {
            orderCondition.push(['uid', 'desc'])
        } else {
            orderCondition.push(['createdAt', 'desc'])
        }

        try {
            await Counselor.sequelize?.transaction(async t => {

                const counselors = await ModelHelper.findRetrieveCountAll(Counselor, req, findOptions(req, {
                    attributes: ['uid', 'name', 'phone', 'order', 'enable', 'createdAt'],
                    where: whereClauses,
                    order: orderCondition,
                    transaction: t
                }));

                if (counselors.rows.length <= 0) throw new InternalError(CODE.NoContent, '등록된 상담사가 없습니다.');

                return response(req, res, CODE.OK, { rows: counselors.rows, count: counselors.count })
            })
        } catch (error) {
            response(req, res, error);
        }
    };

    // 상세
    static counselorDetail = async (req: Request, res: Response) => {

        const params: CounselorAttr = req.body;

        try {
            await Counselor.sequelize?.transaction(async t => {

                const counselor = await Counselor.findByPk(params.uid, {
                    transaction: t
                });

                if (!counselor) throw new InternalError(CODE.NotFound, '존재하지 않은 상담사입니다.');

                return response(req, res, CODE.OK, counselor);
            })
        } catch (error) {
            response(req, res, error);
        }
    };

    // 상담사 등록
    static counselorRegist = async (req: Request, res: Response) => {

        const params: CounselorAttr = req.body;
        const role = res.locals.payload?.role;

        try {
            await Counselor.sequelize?.transaction(async t => {

                //if (role !== roleType.SYSTEM) throw new InternalError(CODE.Auth.Unauthorized, '권한이 없습니다.');

                const counselor = new Counselor(params);

                // 전화번호 검증 함수 호출
                validatePhoneNumber(params.firstPhone, params.middlePhone, params.lastPhone);

                const clientPhone: any = `${params.firstPhone}${params.middlePhone}${params.lastPhone}`;

                const maxOrder = await Counselor.max('order', { transaction: t }) as number | null;
                counselor.order = (maxOrder ?? 0) + 1
                counselor.phone = clientPhone;
                counselor.enable = true;

                await counselor.save({ transaction: t });

                return response(req, res, CODE.OK, counselor)
            });
        } catch (error) {
            response(req, res, error);
        }
    };

    // 상담사 정보 변경
    static counselorUpdate = async (req: Request, res: Response) => {
        const params: CounselorAttr = req.body;
        const role = res.locals.payload?.role;

        try {
            await Counselor.sequelize?.transaction(async t => {

                const counselor = await Counselor.findByPk(params.uid, { transaction: t });

                if (!counselor) throw new InternalError(CODE.NotFound, '존재하지 않은 상담사입니다.');

                if (params.uid) {
                    const exisingCounselor = await Counselor.findByPk(params.uid, { transaction: t });

                    if (exisingCounselor) throw new InternalError(CODE.Conflict, '이미 사용중인 아이디 입니다.');
                }

                // 전화번호 검증 함수 호출
                validatePhoneNumber(params.firstPhone, params.middlePhone, params.lastPhone);

                const clientPhone: any = `${params.firstPhone}${params.middlePhone}${params.lastPhone}`;

                counselor.set('uid', params.uid);
                counselor.set('name', params.phone);
                counselor.set('phone', clientPhone);

                return response(req, res, CODE.OK,)
            })
        } catch (error) {
            response(req, res, error);
        }
    }

    // 순서변경 / 활성화 상태 변경
    static counselorStatusUpdate = async (req: Request, res: Response) => {
        const params: CounselorAttr = req.body;

        try {
            await Counselor.sequelize?.transaction(async t => {
                const counselor = await Counselor.findByPk(params.uid, { transaction: t });

                if (!counselor) throw new InternalError(CODE.NotFound, '존재하지 않은 상담사입니다.');

                // 최대 order 값 가져오기
                const maxOrder = (await Counselor.max('order', { transaction: t })) as number | null;

                // params.order가 undefined나 null이 아닌 경우에만 처리
                if (params.order !== undefined && params.order !== null) {
                    if (maxOrder !== null && params.order > maxOrder) {
                        throw new InternalError(CODE.BadRequest, `최대 order는 ${maxOrder}입니다.`);
                    }

                    // order가 변경되었는지 확인
                    if (params.order !== counselor.order) {
                        const oldOrder: any = counselor.order;
                        const newOrder: any = params.order;

                        // 기존 order가 더 크고 새로운 order가 작아질 때 (앞당길 때)
                        if (oldOrder > newOrder) {
                            await Counselor.update(
                                { order: Counselor.sequelize?.literal('`order` + 1') },
                                {
                                    where: {
                                        order: { [Op.gte]: newOrder, [Op.lt]: oldOrder } // newOrder 이상, oldOrder 미만
                                    },
                                    transaction: t
                                }
                            );
                        }
                        // 기존 order가 더 작고 새로운 order가 커질 때 (뒤로 갈 때)
                        else {
                            await Counselor.update(
                                { order: Counselor.sequelize?.literal('`order` - 1') },
                                {
                                    where: {
                                        order: { [Op.gt]: oldOrder, [Op.lte]: newOrder } // oldOrder 초과, newOrder 이하
                                    },
                                    transaction: t
                                }
                            );
                        }

                        // 현재 유저의 order를 새로운 order로 설정
                        counselor.set('order', newOrder);
                    }
                }

                counselor.set('enable', params.enable);

                await counselor.save({ transaction: t });

                return response(req, res, CODE.OK, counselor);
            });
        } catch (error) {
            response(req, res, error);
        }
    };

    // 삭제
    static counselorDelete = async (req: Request, res: Response) => {
        const params: CounselorAttr = req.body;
        try {
            await Counselor.sequelize?.transaction(async t => {
                const counselor = await Counselor.findByPk(params.uid, { transaction: t });

                if (!counselor) throw new InternalError(CODE.NotFound, '존재하지 않은 사용자입니다.');

                // 삭제할 삼당사의 order 값 추출
                const counselorOrder = counselor.order;

                // 상담사 삭제
                await counselor.destroy({ transaction: t });

                // 삭제된 유저의 order보다 큰 유저들의 order를 하나씩 줄이기
                await Counselor.update(
                    { order: Counselor.sequelize?.literal('`order` - 1') },
                    {
                        where: {
                            order: { [Op.gt]: counselorOrder } // 삭제된 유저의 order보다 큰 경우에만
                        },
                        transaction: t
                    }
                );

                return response(req, res, CODE.OK);
            });
        } catch (error) {
            response(req, res, error);
        }
    }
}