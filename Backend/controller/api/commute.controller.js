const express = require('express');
const employee = require("../../service/commute.service.js");
const router = express.Router();

router.post("/",employee.commute);

router.get("/",employee.commutelist);

module.exports = router;

/**
 * @swagger
 * /commute:
 *   post:
 *     summary: create commute
 *     description: 
 *     tags: [commute]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: startd,endd
 *               properties:
 *                  startd:
 *                      type: date
 *                  endd:
 *                      type: date
 *               example:
 *                 startd : "2022-01-01 00:00:00"
 *                 endd : "2022-01-01 08:00:00"
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
 *                 message: "create success"
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /commute:
 *   get:
 *     summary: show commute list
 *     description:
 *     tags: [commute]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: query
 *        name: startd
 *        schema:
 *          type: date
 *      - in: query
 *        name: endd
 *        schema:
 *          type: date
 *     responses:
 *       "200":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 commute_start:
 *                   type: date
 *                 commute_end:
 *                   type: date
 *                 employee_id:
 *                   type: integer
 *               example:
 *                 commute_start: "2022-01-01 00:00:00"
 *                 commute_end: "2022-01-01 08:00:00"
 *                 employee_id: 1
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 * 
 * 
 */