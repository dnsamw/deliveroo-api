import { Router } from "express";
import { getMenuData, updateMenu, createNewMenu, getOneMenuById } from "../../controllers/menu";


const menuRouter = Router();

menuRouter.get("/", getMenuData);
menuRouter.get("/:id", getOneMenuById);
menuRouter.post("/", createNewMenu);
menuRouter.patch("/", updateMenu);

export default menuRouter;

/**
 * @swagger
 * tags:
 *   name: Menu
 *   description: Menu management
 */

/**
 * @swagger
 * /v1/menu:
 *   get:
 *     summary: Get menu information
 *     description: Any user can fetch all menu information.
 *     tags: [Menu]
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
 *                 data:
 *                   type: object
 *                 error:
 *                   type: boolean
 *
 *   post:
 *     summary: Create a new menu
 *     description: Create a new menu. Only restaurant admin users can create menus.
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - restaurant_id
 *             properties:
 *               name:
 *                 type: string
 *               restaurant_id:
 *                 type: integer
 *               min_price:
 *                 type: number
 *               description:
 *                 type: string
 *             example:
 *               name: Lunch Menu
 *               restaurant_id: 1
 *               min_price: 9.99
 *               description: Our delicious lunch offerings
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Menu'
 *                 msg:
 *                   type: string
 *                 error:
 *                   type: boolean
 *       "400":
 *         description: Bad Request
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Forbidden
 *
 *   patch:
 *     summary: Update menu
 *     description: Only restaurant admin users can update their own menu information.
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               min_price:
 *                 type: number
 *               description:
 *                 type: string
 *             example:
 *               name: Updated Lunch Menu
 *               min_price: 10.99
 *               description: Our updated delicious lunch offerings
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 updated:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *                 error:
 *                   type: boolean
 *       "400":
 *         description: Bad Request
 *       "401":
 *         description: Unauthorized
 *       "403":
 *         description: Forbidden
 *       "404":
 *         description: Menu not found
 *
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Menu:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         restaurant_id:
 *           type: integer
 *         name:
 *           type: string
 *         min_price:
 *           type: number
 *         description:
 *           type: string
 *         overall_rating:
 *           type: number
 *         created_at:
 *           type: string
 *           format: date-time
 *         last_updated:
 *           type: string
 *           format: date-time
 */