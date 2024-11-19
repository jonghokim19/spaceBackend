import { Request, Response } from 'express';
import { IVerifyOptions } from 'passport-local';
import CODE from '../../common/code';
import InternalError from '../../common/InternalError';
import User from '../../models/user/User';
import ModelHelper from '../../common/ModelHelper';
import { findOptions } from '../../common/bqparam';
import response from '../../common/response';

export default class UserController {

    // 유저 리스트
    static userList = async (req: Request, res: Response) => {

        const role = res.locals.payload?.role;

        try {
            await User.sequelize?.transaction(async t => {

                // admin일 경우 모든 속성 포함, 그렇지 않으면 password 제외
                const attributes = role === 'system' ? undefined : { exclude: ['password'] };

                const userList = await ModelHelper.findRetrieveCountAll(User, req, findOptions(req, {
                    attributes,
                    transaction: t
                }));

                return response(req, res, CODE.OK, { rows: userList.rows, count: userList.count });
            });
        } catch (error) {
            response(req, res, error);
        }
    };

    // 로그인 처리
    static async login(req: Request, uid: string, password: string, done: (error: any, user?: Express.User | false, options?: IVerifyOptions) => void) {

        try {
            await User.sequelize?.transaction(async t => {
                const user: any = await User.findOne({
                    where: { uid: uid },
                    transaction: t
                });

                if (!user) return done(new InternalError(CODE.BadRequest, '아이디 또는 비밀번호를 확인해주세요.'));

                if (user.password !== password) return done(new InternalError(CODE.BadRequest, '아이디 또는 비밀번호를 확인해주세요.'));

                const userData = {
                    uid: uid,
                    name: user.name,
                    role: user.role,
                };

                return done(null, userData);
            })
        } catch (error) {
            return done(new InternalError(error));
        };
    };
}