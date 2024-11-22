import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { Op } from 'sequelize';
import CODE from '../../common/code';
import InternalError from '../../common/InternalError';
import { validatePhoneNumber } from '../../common/phoneValidator';
import response from '../../common/response';
import Counselor from '../../models/counselor/Counselor';
import Inquire, { InquireAttr } from '../../models/inquire/Inquire';
import InquireService from '../../models/inqureService/InquireService';
import Location from '../../models/location/Location';
import Service from '../../models/service/Service';
import User from '../../models/user/User';
import { SolapiMessageService } from "solapi";

export default class InquireController {

    private static counselorOrderIndex = 0;

    static inquireRegist = async (req: Request, res: Response) => {

        const messageService = new SolapiMessageService(process.env.SOLAPI_API_KEY as string, process.env.SOLAPI_API_SECRET as string);
        const params: InquireAttr = req.body;

        try {
            await Inquire.sequelize?.transaction(async t => {

                console.log('=====================');
                console.log(params);
                console.log('=====================');

                // IP 및 기기 정보 설정
                const rawIp: any = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
                const ip = rawIp.startsWith('::ffff:') ? rawIp.slice(7) : rawIp;
                const deviceType = /mobile|android|iphone|ipad|tablet/i.test(req.headers['user-agent'] || '') ? '모바일' : 'PC';

                // 개인정보 수집 동의 확인
                //if (!params.privacyConsent) throw new InternalError(CODE.BadRequest, '개인정보 이용 및 수집 동의여부를 체크해주세요');

                // 전화번호 검증 및 설정
                validatePhoneNumber(params.firstPhone, params.middlePhone, params.lastPhone);
                const clientPhone = `${params.firstPhone}${params.middlePhone}${params.lastPhone}`;

                // 문의 한도 확인
                const existingInquirePhone = await Inquire.count({ where: { clientPhone }, transaction: t });
                const existingInquireIp = await Inquire.count({ where: { ip }, transaction: t });
                if (existingInquirePhone >= 2 || existingInquireIp >= 2) {
                    return response(req, res, CODE.BadRequest, '문의 한도를 초과하였습니다.');
                }

                // 활성상태 상담사 조회 및 순차 배정
                const counselors = await Counselor.findAll({ where: { enable: true }, order: [['order', 'ASC']], transaction: t });
                //if (counselors.length === 0) return response(req, res, CODE.NotFound, '활성상태의 상담사가 없습니다.');

                const counselor = counselors[InquireController.counselorOrderIndex];
                InquireController.counselorOrderIndex = (InquireController.counselorOrderIndex + 1) % counselors.length;

                // 지역 정보 설정
                const location = await Location.findByPk(params.locationUuid, { transaction: t });
                if (!location) throw new InternalError(CODE.NotFound, '존재하지 않은 지역입니다.');


                // 문의 등록
                const inquire = await Inquire.create(
                    {
                        ...params,
                        device: deviceType,
                        ip: ip,
                        clientPhone,
                        locationUuid: location?.uuid,
                        counselorUid: counselor?.uid ? counselor.uid : 'admin'
                    },
                    { transaction: t }
                );

                // 제공 서비스 처리
                const servicesArray = Array.isArray(params.services) ? params.services : params.services.split(',');
                const serviceRecords = await Service.findAll({
                    where: { uuid: { [Op.in]: servicesArray } },
                    transaction: t
                });

                console.log('=====================');
                console.log(params.services);
                console.log('=====================');

                if (serviceRecords.length !== servicesArray.length) throw new InternalError(CODE.NotFound, '존재하지 않은 서비스 있습니다.');

                for (const service of serviceRecords) {
                    await InquireService.create(
                        { inquireUuid: inquire.uuid, serviceUuid: service.uuid },
                        { transaction: t }
                    );
                }

                // 메시지 전송
                const selectedServiceNames = serviceRecords.map(service => service.name.substring(0, 2)).join(', ');

                const admin: any = await User.findByPk('admin');

                let counselorPhone //상담사 전화번호;
                let msgSubject //메시지 제목;
                if (counselor) {
                    msgSubject = '스페이스디자인';
                    counselorPhone = counselor.phone
                } else {
                    console.log('광고주 번호로 전송'); //활성상태의 상담사가 없으면 광고주에게 전송
                    msgSubject = '스페이스디자인(상담사 비활성)';
                    counselorPhone = admin.phone;
                }

                await messageService.sendOne({
                    to: counselorPhone,
                    from: '02-6958-5812',
                    text: `고객(업체): ${inquire.name}\nㆍ문의: ${selectedServiceNames}\nㆍ지역: ${location?.name}\nㆍ연락처: ${clientPhone}`,
                    subject: msgSubject
                });

                // counselor의 marketerPhone으로 메시지 전송
                if (counselor?.marketerPhone) {
                    await messageService.sendOne({
                        to: counselor.marketerPhone,
                        from: '02-6958-5812',
                        text: `고객(업체): ${inquire.name}\nㆍ문의: ${selectedServiceNames}\nㆍ지역: ${location?.name}\nㆍ연락처: ${clientPhone}`,
                        subject: msgSubject
                    });
                }

                return response(req, res, CODE.OK, inquire);
            });
        } catch (error) {
            response(req, res, error);
        }
    };
}
