const express = require('express');
const stock = require("../../service/stock.service.js");
const router = express.Router();

router.get("/", stock.getAllList);

router.post("/", stock.addItem);

router.put("/", stock.setOderNum);

module.exports = router;


/**
 * @swagger
 * /stock:
 *   get:
 *     summary: show event list
 *     description: show event list
 *     tags: [stock]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: stuff_name
 *         schema:
 *           type: string
 *         description: stuff_name
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
 *                  [
 *                  ]
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
 * /stock:
 *   post:
 *     summary: register new stock
 *     description: 
 *     tags: [stock]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: stock_num,expired_date,stuff_name
 *               properties:
 *                  stock_num:
 *                      type: string
 *                  expired_date:
 *                      type: string
 *                  stuff_name:
 *                      type: string
 * 
 *               example:
 *                 stuff_name : "슈넬"
 *                 expired_date : "2022-11-24"
 *                 stock_num: "12"
 * 
 * 
 *     responses:
 *       "200":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  stock_num:
 *                      type: string
 *                  expired_date:
 *                      type: string
 *                  stuff_name:
 *                      type: string
 * 
 *               example:
 *                 stuff_name : "슈넬"
 *                 expired_date : "2022-11-24"
 *                 stock_num: "12"
 * 
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /stock:
 *   put:
 *     summary: update salary
 *     description: 
 *     tags: [stock]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: stock_id,stock_num
 *               properties:
 *                  stock_id:
 *                      type: string
 *                  stock_num:
 *                      type: string
 *               example:
 *                 stock_id : "1"
 *                 stock_num : "120"
 *     responses:
 *       "200":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 *               example:
 *                 message: "update success"
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */