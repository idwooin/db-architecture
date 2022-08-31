const express = require('express');
const cost = require("../../service/cost.service.js");
const router = express.Router();

router.get("/",cost.list);

router.post("/",cost.newcost)

module.exports = router;

/**
 * @swagger
 * /cost:
 *   get:
 *     summary: show costs
 *     description: show costs located in query
 *     tags: [cost]
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
 *        name: costcode
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
 *                  date:
 *                      type: date
 *                  loc:
 *                      type:string
 *                  cost:
 *                      type:number
 *                  methods:
 *                      type:string
 *                example:
 *                  cost_date: "2022-01-01"
 *                  loc: 전농1동 25호점
 *                  cost: 800000
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
 * /cost:
 *   post:
 *     summary: update refund costs
 *     description: refund will be processed
 *     tags: [cost]
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
 *                  properties:
 *                      time:
 *                          type: date
 *                      cost_size:
 *                          type: integer
 *                      costcode:
 *                          type: integer
 *                      stock_id:
 *                          type: integer
 *                          nullable: true
 *                      stock_num:
 *                          type: integer
 *                          nullable: true
 *               example:
 *                 - time: 2022-01-01
 *                   cost_size: 50000
 *                   costcode: 1
 *                 - time: 2022-01-01
 *                   cost_size: 100000
 *                   costcode: 2
 *                 - time: 2022-01-01
 *                   costcode: 6
 *                   stock_id: 1
 *                   stock_num: 2
 *                 - time: 2022-01-01
 *                   costcode: 7
 *                   stock_id: 1
 *                    
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
 * 
 * 
 */