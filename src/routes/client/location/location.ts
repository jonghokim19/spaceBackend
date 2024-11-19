import express from "express";
import bqparam from "../../../common/bqparam";
import LocationController from "../../../controller/clientController/LocationCotroller.ts";

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /client/location:
 *    get:
 *      tags:
 *      - "[클라이언트 페이지] 지역 리스트"
 *      summary: "지역 리스트 (서울, 대구, 세종 등)"
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
 *                                  "name": "시스템관자",
 *                                  "role": "system"
 *                              },
 *                              "isLogin": true
 *                          },
 *                          "body": [
 *                            {
 *                              "uuid": "1",
 *                              "name": "서울"
 *                            },
 *                            {
 *                              "uuid": "2",
 *                              "name": "인천"
 *                            },
 *                            {
 *                              "uuid": "3",
 *                              "name": "대전"
 *                            },
 *                            {
 *                              "uuid": "4",
 *                              "name": "대구"
 *                            },
 *                            {
 *                              "uuid": "5",
 *                              "name": "울산"
 *                            },
 *                            {
 *                              "uuid": "6",
 *                              "name": "부산"
 *                            },
 *                            {
 *                              "uuid": "7",
 *                              "name": "광주"
 *                            },
 *                            {
 *                              "uuid": "8",
 *                              "name": "경기"
 *                            },
 *                            {
 *                              "uuid": "9",
 *                              "name": "강원"
 *                            },
 *                            {
 *                              "uuid": "10",
 *                              "name": "충북"
 *                            },
 *                            {
 *                              "uuid": "11",
 *                              "name": "충남"
 *                            },
 *                            {
 *                              "uuid": "12",
 *                              "name": "전북"
 *                            },
 *                            {
 *                              "uuid": "13",
 *                              "name": "전남"
 *                            },
 *                            {
 *                              "uuid": "14",
 *                              "name": "경북"
 *                            },
 *                            {
 *                              "uuid": "15",
 *                              "name": "경남"
 *                            },
 *                            {
 *                              "uuid": "16",
 *                              "name": "제주"
 *                            }
 *                          ]
 *                        }
 */
router.get('/', bqparam, LocationController.locationList);

export default router;