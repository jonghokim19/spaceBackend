import express from "express";
import bqparam from "../../../common/bqparam";
import SettingController from "../../../controller/adminController/SettingController";
import settingBottom from './settingBottom';

const router = express.Router();

router.use('/bottom', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    next();
}, settingBottom);

/**
 * @swagger
 * paths:
 *  /admin/setting:
 *    post:
 *      tags:
 *      - "[어드민 페이지] 환경설정 관리"
 *      summary: "홈페이지 제목 및 관리자 변경"
 *      description: ""
 *      requestBody:
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                  description: 홈페이지 제목
 *                admin:
 *                  type: string
 *                  description: 관리자 uid
 *      responses:
 *        "200":
 *          description: 결과값
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *              example: {
 *                          "result":{
 *                              "code":200,
 *                              "message":"OK"
 *                          },
 *                          "context": {
 *                              "user": {
 *                                  "uid": "system",
 *                                  "name": "시스템",
 *                                  "role": "system",
 *                              },
 *                              "isLogin": true
 *                          },
 *                          "body": {
 *                            "uuid": "10008a4c-1b38-4e22-9b9a-5e108e372347",
 *                            "text": "메인 화면의 하단 정보",
 *                            "updatedAt": "2024-11-08T01:02:41.819Z",
 *                            "createdAt": "2024-11-08T01:02:41.819Z"
 *                          }
 *                        }
 */
router.post('/', bqparam, SettingController.setting);

export default router;