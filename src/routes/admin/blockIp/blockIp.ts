import express from "express";
import bqparam from "../../../common/bqparam";
import BlockIpController from "../../../controller/adminController/BlockIpController";

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /admin/blockIp:
 *    get:
 *      tags:
 *      - "[어드민 페이지] 차단 IP 관리"
 *      summary: "차단 IP 리스트"
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
 *                          "body": [
 *                            {
 *                              "ip": "111.0.0.11",
 *                              "createdAt": "2024-11-14 10:19:37"
 *                            },
 *                            {
 *                              "ip": "222.0.0.22",
 *                              "createdAt": "2024-11-14 10:19:37"
 *                            }
 *                          ]
 *                        }
 */
router.get('/', bqparam, BlockIpController.blockIpList);

/**
 * @swagger
 * paths:
 *  /admin/blockIp:
 *    post:
 *      tags:
 *      - "[어드민 페이지] 차단 IP 관리"
 *      summary: "IP 차단 또는 해제"
 *      description: ""
 *      requestBody:
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *            schema:
 *              type: object
 *              properties:
 *                ip:
 *                  type: string
 *                  description: "단일, 다중 등록 및 해제 가능 (다중 예, 123.0.0.123, 321.0.0.321)"
 *                isUnblock:
 *                  type: boolean
 *                  description: true 해제
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
 *                              "ip": "123.0.0.123",
 *                              "status": "registered"
 *                            },
 *                            {
 *                              "ip": "321.0.0.321",
 *                              "status": "registered"
 *                            }
 *                          ]
 *                        }
 */
router.post('/', bqparam, BlockIpController.blockIp);

export default router;