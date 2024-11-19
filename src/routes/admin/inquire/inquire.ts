import express from "express";
import bqparam from "../../../common/bqparam";
import InquireController from "../../../controller/adminController/InquireController";

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /admin/inquire:
 *    get:
 *      tags:
 *      - "[어드민 페이지] 문의내역 관리"
 *      summary: "전체 문의내역 조회"
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
 *          description: ""
 *          schema:
 *            type: string
 *        - in: query
 *          name: endDate
 *          required: false
 *          description: ""
 *          schema:
 *            type: string
 *        - in: query
 *          name: dateFilter
 *          required: false
 *          description: "today, yesterday, thisWeek, thisMonth, lastWeek, lastMonth"
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
 *                              "name": "시스템관자",
 *                              "role": "system"
 *                            },
 *                            "isLogin": true
 *                          },
 *                          "count": 10,
 *                          "page": 1,
 *                          "totalCount": 3,
 *                          "totalPage": 1,
 *                          "body": [
 *                            {
 *                              "uuid": "2219907c-e8cb-40d2-8956-e13f00d888f0",
 *                              "receptionTime": "2024-11-07T05:19:04.000Z",
 *                              "device": "PC",
 *                              "ip": "::1",
 *                              "name": "마레",
 *                              "clientPhone": "01012345678",
 *                              "counselorInfo": {
 *                                "uid": "test2",
 *                                "name": "테스트2",
 *                                "phone": "01011112222",
 *                                "order": 2
 *                              }
 *                            },
 *                            {
 *                              "uuid": "77dc019d-c924-4d18-934c-f61eebb5b1d3",
 *                              "receptionTime": "2024-11-07T05:18:25.000Z",
 *                              "device": "PC",
 *                              "ip": "::1",
 *                              "name": "마레",
 *                              "clientPhone": "01012345678",
 *                              "counselorInfo": {
 *                                "uid": "test1",
 *                                "name": "테스트1",
 *                                "phone": "01000001111",
 *                                "order": 1
 *                              }
 *                            }
 *                          ]
 *                        }
 *        "401":
 *          description: 조회 권한이 없는 경우
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *              example: {
 *                          "result": {
 *                            "code": 401,
 *                            "message": "조회 권한이 없습니다."
 *                          },
 *                          "context": {
 *                            "user": {
 *                              "uid": "system",
 *                              "name": "시스템관자",
 *                              "role": "system"
 *                            },
 *                            "isLogin": true
 *                          }
 *                       }
 */
router.get('/', bqparam, InquireController.inquireList);

export default router;