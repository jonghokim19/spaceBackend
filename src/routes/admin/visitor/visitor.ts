import express from "express";
import bqparam from "../../../common/bqparam";
import VisitorController from "../../../controller/adminController/VisiorController";

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /admin/visitor:
 *    get:
 *      tags:
 *      - "[어드민 페이지] 방문자 관리"
 *      summary: "홈페이지 방문자 현황"
 *      description: ""
 *      parameters:
 *        - in: query
 *          name: page
 *          required: false
 *          description: ""
 *          schema:
 *            type: string
 *        - in: query
 *          name: pageSize
 *          required: false
 *          description: ""
 *          schema:
 *            type: string
 *        - in: query
 *          name: startDate
 *          required: false
 *          description: "ex, 2024-11-01"
 *          schema:
 *            type: string
 *        - in: query
 *          name: endDate
 *          required: false
 *          description: "ex, 2024-11-08"
 *          schema:
 *            type: string
 *        - in: query
 *          name: visitor
 *          required: false
 *          description: "os, device, ip, year, month, week, day"
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: 결과값
 *          content:
 *            application/json:
 *              schema:
 *                type: object
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
 *                          "count": 10,
 *                          "page": 1,
 *                          "totalCount": 1,
 *                          "totalPage": 1,
 *                          "body": [
 *                            {
 *                              "os": "Windows",
 *                              "count": 2
 *                            }
 *                          ]
 *                        }
 */
router.get('/', bqparam, VisitorController.visitorList);

export default router;