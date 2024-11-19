import { Request, Response } from 'express';
import { roleType } from '../../../common/models/user/IUser';
import CODE from '../../common/code';
import InternalError from '../../common/InternalError';
import response from '../../common/response';
import BottomInfo, { BottomInfoAttr } from '../../models/bottomInfo/BottomInfo';
import { SettingAttr } from '../../models/setting/Setting';
import Setting from '../../models/setting/Setting';
import User from '../../models/user/User';

export default class SettingController {

    // 설정정보
    static settingDetail = async (req: Request, res: Response) => {

        try {
            await Setting.sequelize?.transaction(async t => {

                const setting = await Setting.findOne({ transaction: t });

                return response(req, res, CODE.OK, setting);
            })
        } catch (error) {
            response(req, res, error);
        }
    }

    // 환경 설정 및 수정
    static setting = async (req: Request, res: Response) => {
        const params: SettingAttr = req.body;

        try {
            await Setting.sequelize?.transaction(async t => {

                const setting: any = await Setting.findOne({ transaction: t });

                const user = await User.findByPk(params.admin, { transaction: t });

                if (!user) throw new InternalError(CODE.NotFound, '존재하지 않은 관리자 입니다.');

                if (!setting) {
                    const newSetting = new Setting(params);
                    await newSetting.save({ transaction: t });
                }

                setting.set('title', params.title);
                setting.set('admin', user.uid);

                await setting?.save({ transaction: t });

                return response(req, res, CODE.OK, setting);
            })
        } catch (error) {
            response(req, res, error);
        }
    }
}