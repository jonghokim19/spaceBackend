import express from "express";
import bqparam from "../../../common/bqparam";
import BottomInfoController from "../../../controller/adminController/BottomInfoController";

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /admin/setting/bottom:
 *    get:
 *      tags:
 *      - "[어드민 페이지] 환경설정 관리"
 *      summary: "홈페이지 하단정보 상세보기"
 *      description: ""
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
router.get('/', bqparam, BottomInfoController.bottomInfoDetail);

/**
 * @swagger
 * paths:
 *  /admin/setting/bottom:
 *    post:
 *      tags:
 *      - "[어드민 페이지] 환경설정 관리"
 *      summary: "홈페이지 하단정보 등록 및 수정"
 *      description: ""
 *      requestBody:
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *            schema:
 *              type: object
 *              properties:
 *                text:
 *                  type: string
 *                  description: 하단정보
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
 *                            "text": "메인 화면의 하단정보 수정",
 *                            "updatedAt": "2024-11-08T01:02:41.819Z",
 *                            "createdAt": "2024-11-08T01:02:41.819Z"
 *                          }
 *                        }
 */
router.post('/', bqparam, BottomInfoController.bottomInfo);

export default router;