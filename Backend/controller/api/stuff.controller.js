const express = require('express');
const stuff = require("../../service/stuff.service.js");
const router = express.Router();

router.get("/", stuff.getList);

router.post("/newitem", stuff.addItem);

router.put("/uitem", stuff.updateItem);

router.delete('/ditem', stuff.deleteItem);

module.exports = router;

/**
 * @swagger
 * /stuff:
 *   get:
 *     summary: show stuff
 *     description: show stuff in UOS25
 *     tags: [stuff]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: query
 *        name: stuff_name
 *        schema:
 *          type: string
 *      - in: query
 *        name: stuff_id
 *        schema:
 *          type: integer
 *      - in: query
 *        name: stuffcode
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
 *                  stuff_id:
 *                      type: integer
 *                  stuff_name:
 *                      type: string
 *                  stuff_code:
 *                      type: integer
 *                  first_cost:
 *                      type: integer
 *                  fixed_price:
 *                      type: integer
 *                  provider:
 *                      type: integer
 *                  expire_period:
 *                      type: integer
 *                  auto_order_num:
 *                      type: integer
 *                example:
 *                  stuff_id: 1
 *                  stuff_name: '슈넬'
 *                  stuff_code: 1
 *                  first_cost: 1500
 *                  fixed_price: 2300
 *                  provider: '슈넬'
 *                  auto_order_num: 0
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
 * /stuff/newitem:
 *   post:
 *     summary: add new stuff
 *     description: add new item
 *     tags: [stuff]
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
 *                      stuff_name:
 *                          type: string
 *                      stuffcode:
 *                          type: integer
 *                      first_cost:
 *                          type: integer
 *                      fixed_price:
 *                          type: integer
 *                      provider:
 *                          type: integer
 *                      expire_period:
 *                          type: integer
 *                          nullable: true
 *                      auto_order_num:
 *                          type: integer
 *               example:
 *                 - stuff_name: '프링글스'
 *                   stuffcode: 8
 *                   first_cost: 2300
 *                   fixed_price: 4500
 *                   provider: '농심'
 *                   auto_order_num: 0
 *                 - stuff_name: '이프로'
 *                   stuffcode: 5
 *                   first_cost: 1000
 *                   fixed_price: 2000
 *                   provider: '롯데'
 *                   auto_order_num: 0
 *                 - stuff_name: '닌텐도카드'
 *                   stuffcode: 7
 *                   first_cost: 9000
 *                   fixed_price: 10000
 *                   provider: '닌텐도'
 *                   auto_order_num: 0
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

/**
 * @swagger
 * /stuff/uitem:
 *   put:
 *     summary: update item
 *     description: update item
 *     tags: [stuff]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  stuff_id:
 *                     type: integer
 *                  auto_order_num:
 *                     type: integer
 *                     nullable: true
 *                  stuffcode:
 *                     type: integer
 *                     nullable: true
 *                  fixed_price:
 *                     type: integer
 *                     nullable: true
 *               example:
 *                  stuff_id: 11
 *                  auto_order_num: 2
 *                  stuffcode: 3
 *                  fixed_price: 10000
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
 *                 message: "update success"
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
 * /stuff/ditem:
 *   delete:
 *     summary: delete item
 *     description: delete item
 *     tags: [stuff]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 stuff_id:
 *                 type: integer
 *               example:
 *                 stuff_id: 10
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
 *                 message: "delete success"
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 * 
 * 
 */