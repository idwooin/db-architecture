const express = require('express');
const package = require("../../service/package.service.js");
const router = express.Router();

// package list retrive
router.get("/",package.getAllPackageLsit);

// register new package
router.post("/",package.registerNewPackage);


module.exports = router;

/**
 * @swagger
 * /package:
 *   get:
 *     summary: show package list
 *     description: show packages list
 *     tags: [package]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: branch
 *         schema:
 *           type: string
 *         description: branch_name
 *       - in: query
 *         name: package_type
 *         schema:
 *           type: string
 *         description: package_type
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
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
 *                  date: "2022-01-01"
 *                  loc: 전농1동 25호점
 *                  cost: 800000
 *                  methods: 발주
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
 * /package:
 *   post:
 *     summary: register new package
 *     description: 
 *     tags: [package]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: weight,b_phone,b_address,b_name,s_phone,s_address,s_name,commision,package_price,package_type
 *               properties:
 *                  branch:
 *                      type: string
 *                  weight:
 *                      type: string
 *                  b_phone:
 *                      type: string
 *                  b_name:
 *                      type: string
 *                  b_address:
 *                      type: string
 *                  s_phone:
 *                      type: string
 *                  s_address:
 *                      type: string
 *                  s_name:
 *                      type: string
 *                  commision:
 *                      type: string
 *                  package_price:
 *                      type: string
 *                  package_type:
 *                      type: string
 * 
 * 
 *               example:
 *                 branch : "전농1동 1호점"
 *                 weight : "1"
 *                 b_phone : "01012345678"
 *                 b_name : "김철수"
 *                 b_address : "GS 전농점"
 *                 s_phone : "01012340123"
 *                 s_address : "GS 강남정"
 *                 s_name : "김영희"
 *                 commision : "0"
 *                 package_price : "2500"
 *                 package_type : "반값택배"
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
 *                  weight:
 *                      type: string
 *                  b_phone:
 *                      type: string
 *                  b_name:
 *                      type: string
 *                  b_address:
 *                      type: string
 *                  s_phone:
 *                      type: string
 *                  s_address:
 *                      type: string
 *                  s_name:
 *                      type: string
 *                  commision:
 *                      type: string
 *                  package_price:
 *                      type: string
 *                  pakage_type:
 *                      type: string
 * 
 *               example:
 *                 code: 200
 *                 weight : "1"
 *                 b_phone : "010-1234-5678"
 *                 b_name : "김철수"
 *                 b_address : "GS 전농점"
 *                 s_phone : "010-1234-0123"
 *                 s_address : "GS 강남정"
 *                 s_name : "김영희"
 *                 commision : "0"
 *                 package_price : "2500"
 *                 package_type : "반값택배"
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
