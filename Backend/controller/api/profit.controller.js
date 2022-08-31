const express = require('express');
const profit = require("../../service/profit.service.js");
const router = express.Router();


router.get("/",profit.list);

router.post("/",profit.newprofit);

module.exports = router;

/**
 * @swagger
 * /profit:
 *   get:
 *     summary: show profits
 *     description: show profits located in query
 *     tags: [profit]
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
 *        name: profitcode
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
 *                  profit:
 *                      type:number
 *                  profitcode:
 *                      type:number
 *                example:
 *                  date: "2022-01-01"
 *                  profit: 800000
 *                  profitcode: 1
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
 * /profit:
 *   post:
 *     summary: update profit
 *     description: 
 *     tags: [profit]
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
 *                      date:
 *                          type: date
 *                      profit:
 *                          type: number
 *                      profitcode:
 *                          type: number
 *               example:
 *                 - date : "2022-01-05"
 *                   profit : 50000
 *                   profitcode : 1
 *                 - date : "2022-01-05"
 *                   profit : 100000
 *                   profitcode : 2
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
 */
