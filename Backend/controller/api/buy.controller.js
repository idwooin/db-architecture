const express = require('express');
const buy = require("../../service/buy.service.js");
const router = express.Router();

router.get("/",buy.list);

router.post("/",buy.newbuy)

module.exports = router;

/**
 * @swagger
 * /buy:
 *   get:
 *     summary: show buy lists
 *     description: show buys by where predicate
 *     tags: [buy]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: query
 *        name: startdate
 *        schema:
 *          type: date
 *      - in: query
 *        name: enddate
 *        schema:
 *          type: date
 *      - in: query
 *        name: buycode
 *        schema:
 *          type: integer
 *      - in: query
 *        name: age
 *        schema:
 *          type: integer
 *      - in: query
 *        name: sex
 *        schema:
 *          type: integer
 *      - in: query
 *        name: sumcode
 *        schema:
 *          type: integer
 *     responses:
 *       "200":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
*                type: object
 *                properties:
 *                  stock_id:
 *                      type: integer
 *                  time:
 *                      type: date
 *                  buycode:
 *                      type: integer
 *                  price:
 *                      type: integer
 *                  buy_num:
 *                      type: integer
 *                example:
 *                  stock_id: 1
 *                  time: '2022-01-01 00:00:00'
 *                  buycode: 1
 *                  price: 200000
 *                  buy_num: 5
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 * 
 * 
 */

/**
 * @swagger
 * /buy:
 *   post:
 *     summary: update buy
 *     description: customer buy something
 *     tags: [buy]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type: object
 *                  required: date,profit,profitcode
 *                  properties:
 *                      buy_num:
 *                          type: integer
 *                      buycode:
 *                          type: integer
 *                      age:
 *                          type: integer
 *                          nullable: true
 *                      sex:
 *                          type: integer
 *                          nullable: true
 *                      time:
 *                          type: date
 *                      stuff_id:
 *                          type: integer
 *               example:
 *                 - buy_num: 1
 *                   buycode: 1
 *                   age: 20
 *                   sex: 0
 *                   time: '2022-01-01'
 *                   stuff_id: 1
 *                 - buy_num: 2
 *                   buycode: 1
 *                   age: 20
 *                   sex: 0
 *                   time: '2022-01-01'
 *                   stuff_id: 2
 *                 - buy_num: 3
 *                   buycode: 1
 *                   age: 23
 *                   sex: 1
 *                   time: '2022-01-02'
 *                   stuff_id: 4
 *     responses:
 *       "200":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  code:
 *                      type: number
 *                  message:
 *                      type: string
 *               example:
 *                 code: 200
 *                 message: "success"
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "500":
 *         description: server error
 *         content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      code:
 *                          type: number
 *                      message:
 *                          type: string
 *                  example:
 *                      code: 500
 *                      message: "something error"
 * 
 * 
 */