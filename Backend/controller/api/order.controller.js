const express = require('express');
const order = require("../../service/order.service.js");
const router = express.Router();

router.post("/", order.applyOrder);

router.get("/", order.getList);

router.delete("/:order_id", order.deleteOrder);

router.get("/necessary", order.getNeccesaryList);

module.exports = router;

/**
 * @swagger
 * /order:
 *   post:
 *     summary: apply order
 *     description: make order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - order_num
 *               - stuff_id
 *             properties:
 *               order_num:
 *                 type: integer
 *               stuff_id:
 *                 type: integer
 *             example:
 *               order_num: 5
 *               stuff_id: 1
 *     responses:
 *       "200":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *             properties:
 *               order_id:
 *                 type: integer
 *             example:
 *               order_id: 3
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */ 
 
/**
 * @swagger
 * /order:
 *   get:
 *     summary: Get all order list
 *     description: get order list 
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /order/{order_id}:
 *   delete:
 *     summary: Delete an order
 *     description: branch owner can delete an order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /order/necessary:
 *   get:
 *     summary: Get all deficient order list
 *     description: get all deficient order list 
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Stock'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */