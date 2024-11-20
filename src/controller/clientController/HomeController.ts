import { Request, Response } from 'express';
import CODE from '../../common/code';
import response from '../../common/response';
import BottomInfo, { BottomInfoAttr } from '../../models/bottomInfo/BottomInfo';
import Visitor from '../../models/visitor/Visitor';
import BlockIp from '../../models/blockIp/BlockIp';
import InternalError from '../../common/InternalError';

export default class HomeController {

    // 하단정보
    static home = async (req: Request, res: Response) => {

        const params: BottomInfoAttr = req.body;

        try {
            await BottomInfo.sequelize?.transaction(async t => {

                const bottomInfo = await BottomInfo.findAll({
                    attributes: ['text'],
                    limit: 1,
                    transaction: t
                });

                // 방문자 정보 추출 및 저장
                const userAgent = req.headers['user-agent'] || '';
                const rawIp: any = req.ip;
                const ip = rawIp.startsWith('::ffff:') ? rawIp.slice(7) : rawIp; // IPv4로 변환
                const deviceType = /mobile|android|iphone|ipad|tablet/i.test(userAgent) ? '모바일' : 'PC';


                console.log('==================');
                console.log('Headers:', req.headers);
                console.log('==================');
                const os = /windows/i.test(userAgent) ? 'Windows' :
                    /mac/i.test(userAgent) ? 'MacOS' :
                        /linux/i.test(userAgent) ? 'Linux' :
                            /android/i.test(userAgent) ? 'Android' :
                                /iphone|ipad/i.test(userAgent) ? 'iOS' : 'Unknown';

                // 차단 ip조회
                const blockIp = await BlockIp.findByPk(ip);
                if (blockIp) throw new InternalError(CODE.Auth.Unauthorized, '차단된 ip입니다.');

                // Referer 확인 및 검색어 추출
                const referer = req.headers['referer'] || '';
                let searchKeyword;
                let searchEngine;

                const decodeWithBuffer = (str: string) => {
                    return Buffer.from(str, 'latin1').toString('utf8');
                };

                if (referer) {
                    try {
                        const url = new URL(referer);

                        // Google 검색어 추출
                        if (/google\./i.test(url.hostname)) {
                            searchEngine = 'Google';
                            const encodedKeyword = url.searchParams.get('q');
                            searchKeyword = encodedKeyword ? decodeWithBuffer(decodeURIComponent(encodedKeyword)) : null;
                        }

                        // Naver 검색어 추출
                        if (/naver\./i.test(url.hostname)) {
                            searchEngine = 'Naver';
                            const encodedKeyword = url.searchParams.get('query');
                            searchKeyword = encodedKeyword ? decodeWithBuffer(decodeURIComponent(encodedKeyword)) : null;
                        }
                    } catch (error) {
                        console.error('Error processing Referer:', error);
                    }
                }

                const visitor = new Visitor({
                    ...req.body,
                    ip: ip,
                    device: deviceType,
                    searchEngine: searchEngine,
                    searchKeyword: searchKeyword,
                    os: os,
                    createdAt: new Date()
                });

                await visitor.save({ transaction: t });

                return response(req, res, CODE.OK, bottomInfo);
            })
        } catch (error) {
            response(req, res, error);
        }
    };
}