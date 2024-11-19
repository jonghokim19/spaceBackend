import express from "express";
import bqparam from "../../../common/bqparam";
import UserController from "../../../controller/adminController/UserController";

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /admin/user:
 *    post:
 *      tags:
 *      - "[어드민 페이지] 사용자 관리"
 *      summary: "전체 관리자 계정 조회"
 *      description: "system 계정은 password 속성 포함하여 리턴"
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
 *                          "body": [
 *                            {
 *                              "uid": "admin",
 *                              "role": "admin",
 *                              "name": "광고주",
 *                              "email": null,
 *                              "phone": "01089070653",
 *                              "createdAt": "2024-11-13T05:20:49.000Z",
 *                              "updatedAt": null
 *                            },
 *                            {
 *                              "uid": "system",
 *                              "role": "system",
 *                              "name": "시스템",
 *                              "email": null,
 *                              "phone": null,
 *                              "createdAt": "2024-11-07T02:45:48.000Z",
 *                              "updatedAt": null
 *                            }
 *                          ]
 *                        }
 */
router.post('/', bqparam, UserController.userList);

export default router;