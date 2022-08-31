const express = require('express');
const employee = require("../../service/employee.service.js");
const router = express.Router();


router.post("/",employee.newemployee);

router.get("/",employee.list);

router.put("/salary",employee.salary);

router.delete("/",employee.fire);

module.exports = router;

/**
 * @swagger
 * /employee:
 *   post:
 *     summary: create employee
 *     description: 
 *     tags: [employee]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: employee_name,employee_phone,salary
 *               properties:
 *                  employee_name:
 *                      type: string
 *                  employee_phone:
 *                      type: string
 *                  salary:
 *                      type: integer
 *                  id:
 *                      type: string
 *                  pw:
 *                      type: string
 *               example:
 *                 employee_name : "김모찌"
 *                 employee_phone : "01024446666"
 *                 salary : 11000
 *                 id: gimochi
 *                 pw: gimochi
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

/**
 * @swagger
 * /employee:
 *   get:
 *     summary: show employee
 *     description:
 *     tags: [employee]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 employee_name:
 *                  type:string
 *                 employee_phone:
 *                  type:string
 *                 salary:
 *                  type:integer
 *               example:
 *                 employee_id: 2
 *                 employee_name : "김편돌"
 *                 employee_phone : "01024445555"
 *                 salary : 10000
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
 * /employee/salary:
 *   put:
 *     summary: update salary
 *     description: 
 *     tags: [employee]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: employee_name,salary,branch_id
 *               properties:
 *                  employee_name:
 *                      type: string
 *                  salary:
 *                      type: integer
 *               example:
 *                 employee_name : "김편돌"
 *                 salary : 10000
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
 */

/**
 * @swagger
 * /employee:
 *   delete:
 *     summary: fire employee
 *     description: 
 *     tags: [employee]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: employee_name,salary,branch_id
 *               properties:
 *                  employee_name:
 *                      type: string
 *               example:
 *                 employee_name : "김편돌"
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
 */