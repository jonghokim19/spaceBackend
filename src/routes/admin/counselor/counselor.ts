import express from "express";
import bqparam from "../../../common/bqparam";
import counselorStatus from './counselorStatus';
import CounselorController from "../../../controller/adminController/CounselorController";

const router = express.Router();

router.use('/:uid/status', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    req.query.uid = req.params.uid,
        next();
}, counselorStatus);

/**
 * @swagger
 * paths:
 *  /admin/counselor:
 *    get:
 *      tags:
 *      - "[어드민 페이지] 상담사 관리"
 *      summary: "전체 상담사 조회"
 *      description: ""
 *      parameters:
 *        - in: query
 *          name: uid
 *          required: false
 *          description: 상담사 ID
 *          schema:
 *            type: string
 *        - in: query
 *          name: name
 *          required: false
 *          description: 상담사명
 *          schema:
 *            type: string
 *        - in: query
 *          name: sort
 *          required: false
 *          description: "nameAsc, nameDesc, uidAsc, uidDesc, orderAsc, orderDesc"
 *          schema:
 *            type: string
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
 *      responses:
 *        "200":
 *          description: 전체 상담사 조회
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
 *                          "count": 1,
 *                          "page": 1,
 *                          "totalCount": 2,
 *                          "totalPage": 2,
 *                          "body": [
 *                            {
 *                              "uid": "test2",
 *                              "name": "테스트2",
 *                              "phone": "01064381064",
 *                              "order": 2,
 *                              "enable": true,
 *                              "createdAt": "2024-11-07T05:15:03.000Z"
 *                            }
 *                          ]
 *                        }
 */
router.get('/', bqparam, CounselorController.counselorList);

/**
 * @swagger
 * paths:
 *  /admin/counselor/{uid}:
 *    get:
 *      tags:
 *      - "[어드민 페이지] 상담사 관리"
 *      summary: "상담사 상세 조회"
 *      description: ""
 *      parameters:
 *        - in: path
 *          name: uid
 *          required: true
 *          description: 상담사 ID (uid)
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: 상담사 정보
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
 *                            "uid": "test1",
 *                            "name": "테스트1",
 *                            "phone": "01089070653",
 *                            "order": 1,
 *                            "enable": true,
 *                            "createdAt": "2024-11-07T02:47:39.000Z",
 *                            "updatedAt": "2024-11-07T04:31:18.000Z"
 *                          }
 *                       }
 *        "404":
 *          description: 해당 리소스가 존재하지 않습니다
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *              example: {
 *                          "result":{
 *                              "code":404,
 *                              "message":"해당 리소스가 존재하지 않습니다."
 *                          }
 *                       }
 */
router.get('/:uid', bqparam, CounselorController.counselorDetail);

/**
 * @swagger
 * paths:
 *  /admin/counselor:
 *    post:
 *      tags:
 *      - "[어드민 페이지] 상담사 관리"
 *      summary: "상담사 등록"
 *      description: ""
 *      requestBody:
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *            schema:
 *              type: object
 *              properties:
 *                uid:
 *                  type: string
 *                  description: 상담사 아이디 (최대 15자리, 영문+숫자)
 *                name:
 *                  type: string
 *                  description: 상담사 이름 (최대 10자리)
 *                firstPhone:
 *                  type: string
 *                  description: 첫번째 전화번호 (010)
 *                middlePhone:
 *                  type: string
 *                  description: 중간 전화번호 (4자리)
 *                lastPhone:
 *                  type: string
 *                  description: 마지막 전화번호 (4자리)
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
 *                            "enable": true,
 *                            "uid": "test3",
 *                            "name": "테스트3",
 *                            "phone": "01000001111",
 *                            "order": 3,
 *                            "updatedAt": "2024-11-08T00:58:05.502Z",
 *                            "createdAt": "2024-11-08T00:58:05.502Z"
 *                          }
 *                       }
 */
router.post('/', bqparam, CounselorController.counselorRegist);

/**
 * @swagger
 * paths:
 *  /admin/counselor/{uid}:
 *    delete:
 *      tags:
 *      - "[어드민 페이지] 상담사 관리"
 *      summary: "상담사 삭제"
 *      description: ""
 *      parameters:
 *        - in: path
 *          name: uid
 *          required: true
 *          description: 상담사 ID(uid)
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
 *                          }
 *                        }
 */
router.delete('/:uid', bqparam, CounselorController.counselorDelete);

export default router;