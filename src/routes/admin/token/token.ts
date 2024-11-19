import express from "express";
import InternalError from "../../../common/InternalError";
import Passport from "../../../common/Passport";
import CODE from "../../../common/code";
import response from "../../../common/response";
import User from "../../../models/user/User";

const router = express.Router();

/**
 * @swagger
 * /admin/token:
 *  post:
 *    security: 
 *      - bearerAuth: []
 *    summary: "로그인"
 *    description: ""
 *    tags: ["[어드민 페이지] 로그인(토큰) 관리"]
 *    requestBody:
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            required:
 *              - uid
 *              - password
 *            properties:
 *              uid:
 *                type: string
 *                description: 사용자 ID(uid)
 *              password:
 *                type: string
 *                description: 패스워드
 *    responses:
 *      "200":
 *        description: 결과값
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example: {
 *                          "result": {
 *                              "code": 200,
 *                              "message": "OK"
 *                          },
 *                          "context": {
 *                              "user":{
 *                                  "uid": "system",
 *                                  "name": "시스템",
 *                                  "role": "system"
 *                              },
 *                              "isLogin":true
 *                          }
 *                       }
 */
router.post('/', Passport.signin, (req: express.Request, res: express.Response) => {

    console.log(`/admin/token, res.locals.payload : `, JSON.stringify(res.locals));
    response(req, res, CODE.OK);
});

/**
 * @swagger
 * /admin/token:
 *  delete:
 *    security: 
 *      - bearerAuth: []
 *    summary: "로그아웃"
 *    description: ""
 *    tags: ["[어드민 페이지] 로그인(토큰) 관리"]
 *    responses:
 *      "200":
 *        description: 결과값
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example: {
 *                          "result": {
 *                            "code": 200,
 *                            "message": "OK"
 *                          },
 *                          "context": {
 *                            "user": {
 *                              "uid": "system",
 *                              "name": "시스템",
 *                              "role": "system"
 *                            },
 *                            "isLogin": true
 *                          },
 *                          "body": {
 *                            "uid": "system",
 *                            "name": "시스템",
 *                            "role": "system"
 *                          }
 *                       }
 */
router.delete('/', Passport.signout, (req: express.Request, res: express.Response) => {

    console.log(`/admin/token/logout, res.locals.payload : `, JSON.stringify(res.locals));
    response(req, res, CODE.OK, res.locals.payload ? res.locals.payload : undefined);
});


/**
 * @swagger
 * /admin/token/context:
 *  get:
 *    security: 
 *      - bearerAuth: []
 *    summary: "컨텍스트 정보 조회"
 *    description: ""
 *    tags: ["[어드민 페이지] 로그인(토큰) 관리"]
 *    responses:
 *      "200":
 *        description: 결과값
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example: {
 *                          "result": {
 *                            "code": 200,
 *                            "message": "OK"
 *                          },
 *                          "context": {
 *                            "user": {
 *                              "uid": "system",
 *                              "name": "시스템",
 *                              "role": "system"
 *                            },
 *                            "isLogin": true
 *                          },
 *                          "body": {
 *                            "user": {
 *                              "uid": "system",
 *                              "name": "시스템",
 *                              "role": "system"
 *                            }
 *                          }
 *                        }
 *      "403":
 *        description: 비로그인시
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example: {
 *                          "result": {
 *                            "code": 403,
 *                            "message": "토큰 정보가 존재하지 않습니다."
 *                          },
 *                          "context": {
 *                            "isLogin": false
 *                          }
 *                        }
 */
router.get('/context', async (req: express.Request, res: express.Response) => {
    console.log(`/admin/context(get), res.locals.payload : `, JSON.stringify(res.locals));
    const uid = res.locals.payload?.uid;

    try {
        await User.sequelize?.transaction(async t => {

            if (!uid) {
                throw new InternalError(CODE.Auth.Expired, '토큰 정보가 존재하지 않습니다.');
            }

            const user = await User.findOne({
                attributes: ['uid', 'name', 'role'],
                where: { uid: uid },
                transaction: t
            });

            if (!user) {
                throw new InternalError(CODE.NoContent, '사용자 정보가 없습니다.');
            }

            const responseData = {
                user: {
                    uid: uid,
                    name: user.name,
                    role: user.role,
                }
            };

            return response(req, res, CODE.OK, responseData);
        })
    } catch (error) {
        response(req, res, error);
    }
});

export default router;