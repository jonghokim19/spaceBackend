import express from "express";
import bqparam from "../../../common/bqparam";
import HomeController from "../../../controller/clientController/HomeController";

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /client/home:
 *    get:
 *      tags:
 *      - "[클라이언트 페이지] 메인 화면"
 *      summary: "메인 화면"
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
 *                              {
 *                                "text": "메인의 하단정보 수정"
 *                              }
 *                          ]
 *                        }
 */
router.get('/', bqparam, HomeController.home);

export default router;