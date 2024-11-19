import express from "express";
import bqparam from "../../../common/bqparam";
import CounselorController from "../../../controller/adminController/CounselorController";

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /admin/counselor/{uid}/status:
 *    put:
 *      tags:
 *      - "[어드민 페이지] 상담사 관리"
 *      summary: "상담사 순서 및 활성화 변경"
 *      description: ""
 *      parameters:
 *        - in: path
 *          name: uid
 *          required: true
 *          description: 상담사 ID (uid)
 *          schema:
 *            type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *            schema:
 *              type: object
 *              properties:
 *                order:
 *                  type: number
 *                  description: 순서
 *                enable:
 *                  type: boolean
 *                  description: 활성화/비활성화
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
 *                          "body": {
 *                            "uid": "test2",
 *                            "name": "테스트2",
 *                            "phone": "01064381064",
 *                            "order": 2,
 *                            "enable": false,
 *                            "createdAt": "2024-11-07T05:15:03.000Z",
 *                            "updatedAt": "2024-11-08T00:59:04.000Z"
 *                          }
 *                       }
 */
router.put('/', bqparam, CounselorController.counselorStatusUpdate);

export default router;