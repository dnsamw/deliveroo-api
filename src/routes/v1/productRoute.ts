import { Router } from "express";
import { getProductData, updateProduct, createNewProduct, getOneProductById } from "../../controllers/product";


const productRouter = Router();

productRouter.get("/", getProductData);
productRouter.get("/:id", getOneProductById);
productRouter.post("/", createNewProduct);
productRouter.patch("/", updateProduct);

export default productRouter;

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management
 */

/**
 * @swagger
 * /v1/products:
 *   get:
 *     summary: Get product information
 *     description: Any user can fetch all product information.
 *     tags: [Product]
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
 *     summary: Create a new product
 *     description: Create a new product. Only restaurant admin users can create products.
 *     tags: [Product]
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
 *               - menu_section_id
 *             properties:
 *               name:
 *                 type: string
 *               menu_section_id:
 *                 type: integer
 *             example:
 *               name: halloumi & roasted veg salad platter
 *               menu_section_id: 2
 *               thumbnail: "https://rs-menus-api.roocdn.com/images/e6afbac5-74e2-4d40-a56f-87245ea5bbdb/image.jpeg"
 *               calories: 300
 *               price: 10.99
 *               short_description: Our delicious lunch offerings
 *               description: A feast for 6 people! halloumi with pesto, roasted peppers, roasted tomatoes, sweet potato, pickled red onion and balsamic dressing served on a mixed leaf base.

 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Product'
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
 *     summary: Update product
 *     description: Only restaurant admin users can update their own product information.
 *     tags: [Product]
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
 *               price: 10.99
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
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         menu_section_id:
 *           type: integer
 *         name:
 *           type: string
 *         thumbnail:
 *           type: string
 *         calories:
 *           type: number
 *         price:
 *           type: number
 *         short_description:
 *           type: string
 *         description:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         last_updated:
 *           type: string
 *           format: date-time
 */