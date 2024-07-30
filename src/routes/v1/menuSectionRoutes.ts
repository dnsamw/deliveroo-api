import { Router } from "express";
import { getMenuSectionData, updateMenuSection, createNewMenuSection, getOneMenuSectionById } from "../../controllers/menuSection";


const menuRouter = Router();

menuRouter.get("/", getMenuSectionData);
menuRouter.get("/:id", getOneMenuSectionById);
menuRouter.post("/", createNewMenuSection);
menuRouter.patch("/", updateMenuSection);

export default menuRouter;

/**
 * @swagger
 * tags:
 *   name: Menu Section (Menu Category)
 *   description: Menu section management
 */

/**
 * @swagger
 * /v1/menu-sections:
 *   get:
 *     summary: Get menu section information
 *     description: Any user can fetch all menu information.
 *     tags: [MenuSection]
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
 *     summary: Create a new menu section
 *     description: Create a new menu section. Only restaurant admin users can create menu sections.
 *     tags: [MenuSection]
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
 *               menu_id:
 *                 type: integer
 *             example:
 *               name: House Specials
 *               menu_id: 1

 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/MenuSection'
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
 *     summary: Update menu section
 *     description: Only restaurant admin users can update their own menu section information.
 *     tags: [MenuSection]
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
 *     MenuSection:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         menu_id:
 *           type: integer
 *         name:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         last_updated:
 *           type: string
 *           format: date-time
 */