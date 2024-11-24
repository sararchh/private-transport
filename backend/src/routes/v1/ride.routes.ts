import { Router } from "express";
import rideController from "@/controllers/ride.controller";
import { validationSchemaMiddleware } from "@/middlewares/validation.middlewares";
import {
  postRideSchema,
  rideConfirmSchema,
  rideFindSchema,
} from "@/schemas/ride.schema";

const rideRouter = Router();

/**
 * @swagger
 * /rides/estimate:
 *   post:
 *     summary: Estimate a ride
 *     tags: [Rides]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: string
 *               origin:
 *                 type: string
 *               destination:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ride estimated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 origin:
 *                   type: object
 *                   properties:
 *                     latitude:
 *                       type: number
 *                     longitude:
 *                       type: number
 *                 destination:
 *                   type: object
 *                   properties:
 *                     latitude:
 *                       type: number
 *                     longitude:
 *                       type: number
 *                 distance:
 *                   type: number
 *                 duration:
 *                   type: string
 *                 options:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       vehicle:
 *                         type: string
 *                       review:
 *                         type: object
 *                         properties:
 *                           rating:
 *                             type: number
 *                           comment:
 *                             type: string
 *                       value:
 *                         type: number
 *                 routeResponse:
 *                   type: object
 *                   properties:
 *                     routes:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           legs:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 startLocation:
 *                                   type: object
 *                                   properties:
 *                                     latLng:
 *                                       type: object
 *                                       properties:
 *                                         latitude:
 *                                           type: number
 *                                         longitude:
 *                                           type: number
 *                                 endLocation:
 *                                   type: object
 *                                   properties:
 *                                     latLng:
 *                                       type: object
 *                                       properties:
 *                                         latitude:
 *                                           type: number
 *                                         longitude:
 *                                           type: number
 *                           distanceMeters:
 *                             type: number
 *                           duration:
 *                             type: string
 *       400:
 *         description: INVALID_DATA
 *       404:
 *         description: DRIVER_NOT_FOUND
 */
rideRouter.post(
  "/estimate",
  validationSchemaMiddleware(postRideSchema),
  rideController.estimate
);

/**
 * @swagger
 * /rides/confirm:
 *   patch:
 *     summary: Confirm a ride
 *     tags: [Rides]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: string
 *               origin:
 *                 type: string
 *               destination:
 *                 type: string
 *               distance:
 *                 type: number
 *               duration:
 *                 type: string
 *               driver:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   name:
 *                     type: string
 *               value:
 *                 type: number
 *     responses:
 *       200:
 *         description: Ride confirmed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *       400:
 *         description: INVALID_DATA
 *       404:
 *         description: DRIVER_NOT_FOUND
 *       406:
 *         description: INVALID_DISTANCE
 */
rideRouter.patch(
  "/confirm",
  validationSchemaMiddleware(rideConfirmSchema),
  rideController.confirm
);

/**
 * @swagger
 * /rides/{customer_id}:
 *   get:
 *     summary: Find rides by customer ID
 *     tags: [Rides]
 *     parameters:
 *       - in: path
 *         name: customer_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Customer ID
 *       - in: query
 *         name: driver_id
 *         schema:
 *           type: number
 *         required: false
 *         description: Driver ID
 *     responses:
 *       200:
 *         description: Rides found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rides:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ride_id:
 *                         type: string
 *                       origin:
 *                         type: string
 *                       destination:
 *                         type: string
 *                       distance:
 *                         type: number
 *                       duration:
 *                         type: number
 *                       driver:
 *                         type: string
 *                       value:
 *                         type: number
 *       400:
 *         description: INVALID_DATA
 *       404:
 *         description: NO_RIDES_FOUND
 */
rideRouter.get(
  "/:customer_id",
  validationSchemaMiddleware(rideFindSchema),
  rideController.find
);

/**
 * @swagger
 * /drivers/all:
 *   get:
 *     summary: Return all drivers
 *     tags: [Rides]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   vehicle:
 *                     type: string
 *                   rating:
 *                     type: integer
 *                   comment:
 *                     type: string
 *                   value:
 *                     type: number
 *                   min_km:
 *                     type: integer
 *       400:
 *         description: INVALID_DATA
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       404:
 *         description: DRIVER_NOT_FOUND
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
rideRouter.get("/drivers/all", rideController.findAllDrivers);

export default rideRouter;
