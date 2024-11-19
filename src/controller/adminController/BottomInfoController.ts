import { Request, Response } from 'express';
import { roleType } from '../../../common/models/user/IUser';
import CODE from '../../common/code';
import InternalError from '../../common/InternalError';
import response from '../../common/response';
import BottomInfo, { BottomInfoAttr } from '../../models/bottomInfo/BottomInfo';

export default class BottomInfoController {

    // 하단정보
    static bottomInfoDetail = async (req: Request, res: Response) => {

        try {
            await BottomInfo.sequelize?.transaction(async t => {

                const bottomInfo = await BottomInfo.findOne({ transaction: t });

                return response(req, res, CODE.OK, bottomInfo);
            })
        } catch (error) {
            response(req, res, error);
        }
    }

    // 하단정보 등록 및 수정
    static bottomInfo = async (req: Request, res: Response) => {

        const role = res.locals.payload?.role;
        const params: BottomInfoAttr = req.body;

        try {
            await BottomInfo.sequelize?.transaction(async t => {

                const bottomInfo = await BottomInfo.findOne({ transaction: t });

                let newbottomInfo;
                if (!bottomInfo) { //등록이 되어있지 않으면 새롭게 생성
                    newbottomInfo = new BottomInfo(params)
                    await newbottomInfo.save({ transaction: t });
                }

                bottomInfo?.set('text', params.text);

                await bottomInfo?.save({ transaction: t });

                const responseData = bottomInfo ? bottomInfo : newbottomInfo;

                return response(req, res, CODE.OK, responseData);
            })
        } catch (error) {
            response(req, res, error);
        }
    }
}