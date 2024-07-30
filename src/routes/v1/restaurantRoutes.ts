import { Router } from "express";
import { getRestaurantData, updateRestaurant, createNewRestaurant, getPaginatedRestaurants } from "../../controllers/restaurant";

const menuRouter = Router();

menuRouter.get("/", getPaginatedRestaurants);
menuRouter.post("/", createNewRestaurant);
menuRouter.patch("/", updateRestaurant);

export default menuRouter;

/**
 * @swagger
 * tags:
 *   name: Restaurant
 *   description: Restaurant management
 */

/**
 * @swagger
 * /v1/restaurant:
 *   get:
 *     summary: Get restaurant information
 *     description: Any user can fetch all restaurant information.
 *     tags: [Restaurant]
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
 *     summary: Create a new restaurant
 *     description: Create a new restaurant. Only master admin users can create restaurant.
 *     tags: [Restaurant]
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
 *             properties:
 *               name:
 *                 type: string
 *               thumbnail:
 *                 type: string
 *               about:
 *                 type: string
 *               allergens_info:
 *                 type: string
 *               telephone:
 *                 type: string
 *               hygiene_description:
 *                 type: string
 *               hygiene_rating:
 *                 type: number
 *               hygiene_rating_image:
 *                 type: string
 *               hygiene_rating_url:
 *                 type: string
 *               address:
 *                 type: string
 *               latitude:
 *                 type: string
 *               longitude:
 *                 type: string
 *               notes:
 *                 type: string
 *             example:
 *               name: London Restaurant
 *               thumbnail: https://rs-menus-api.roocdn.com/images/57800532-e16e-4743-83fb-06c3c2230d76/image.jpeg
 *               about: Our London restaurant
 *               allergens_info: No allergens info
 *               telephone: 123456789
 *               hygiene_description: Our hygiene description
 *               hygiene_rating: 5
 *               hygiene_rating_image: https://ow.roocdn.com/assets/images/fsa/fhrs_5@3x.png
 *               hygiene_rating_url: https://www.foodiesfeed.com/
 *               address: London
 *               latitude: 0
 *               longitude: 0
 *               notes: Our notes
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Restaurant'
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
 *     summary: Update restaurant
 *     description: Only restaurant admin users, master admins and restaurant manager members can update their own restaurant information.
 *     tags: [Restaurant]
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
 *               name: Updated London Restaurant
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
 *         description: Restaurant not found
 *
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Restaurant:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: integer
 *         thumbnail:
 *           type: string
 *         about:
 *           type: number
 *         allergens_info:
 *           type: string
 *         telephone:
 *           type: string
 *         hygiene_description:
 *           type: string
 *         hygiene_rating:
 *           type: number
 *         hygiene_rating_image:
 *           type: string
 *         hygiene_rating_url:
 *           type: string
 *         address:
 *           type: string
 *         latitude:
 *           type: string
 *         longitude:
 *           type: string
 *         notes:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         last_updated:
 *           type: string
 *           format: date-time
 */