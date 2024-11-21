import express from "express";
import bqparam from "../../../common/bqparam";
import InquireController from "../../../controller/clientController/InquireController";

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /client/inquire:
 *    post:
 *      tags:
 *      - "[클라이언트 페이지] 문의하기"
 *      summary: "문의하기"
 *      description: ""
 *      requestBody:
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: 고객 또는 업체명
 *                locationUuid:
 *                  type: string
 *                  description: "지역 id 입력 (1 서울 / 2 인천 / 3 대전 / 4 대구 / 5 울산 / 6 부산 / 7 광주 / 8 경기 / 9 강원 / 10 충북 / 11 충남 / 12 전북 / 13 전남 / 14 경북 / 15 경남 / 16 제주 / 17 세종)"
 *                firstPhone:
 *                  type: number
 *                  description: 전화번호 처음
 *                middlePhone:
 *                  type: number
 *                  description: 전화번호 중간 (숫자 4자리)
 *                lastPhone:
 *                  type: number
 *                  description: 전화번호 마지막 (숫자 4자리)
 *                privacyConsent:
 *                  type: boolean
 *                  description: 개인정보 이용 및 수집 동의여부 (true or false)
 *                services:
 *                  type: string
 *                  description: "서비스 id 입력 (1 - 상가 인테리어 / 2 - 종합 인테리어 / 3 - 부분 인테리어 / 4 - 기타 상담)"
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
 *                          "body": {
 *                            "uuid": "cc5fdccf-8f74-4fcf-8133-b7669c171599",
 *                            "name": "테스트",
 *                            "locationUuid": "1",
 *                            "clientPhone": "01011112222",
 *                            "content": "세부내용",
 *                            "privacyConsent": true,
 *                            "device": "PC",
 *                            "ip": "::ffff:192.168.0.1",
 *                            "counselorUid": "test1",
 *                            "createdAt": "2024-11-08T01:04:49.338Z"
 *                          }
 *                        }
 *        "400":
 *          description: 전화번호 잘못입력시
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *              example: {
 *                          "result":{
 *                              "code":400,
 *                              "message":"가운데 번호는 3자리 또는 4자리여야 하며, 마지막 번호는 4자리 숫자여야 합니다. 연속되거나 반복된 숫자는 사용할 수 없습니다."
 *                          },
 *                          "context": {
 *                              "user": {
 *                                  "uid": "system",
 *                                  "name": "시스템",
 *                                  "role": "system"
 *                              },
 *                              "isLogin": true
 *                          }
 *                        }
 */
router.post('/', bqparam, InquireController.inquireRegist);


export default router;