import express, { Router } from "express";
import {
  getAllWorkouts,
  getExistingWorkout,
  updateExistingWorkout,
  createNewWorkout,
  deleteExistingWorkout,
} from "../controllers/workoutController";
import { getRecordForWorkoutController } from "../controllers/recordsController";
import { jsonParser } from "../../database/utils";
import { param, checkExact, body } from "express-validator";

export const v1workoutRouter: Router = express.Router();

/**
 * @openapi
 * /api/v1/workouts:
 *   get:
 *     tags:
 *       - Workouts
 *     parameters:
 *       - in: query
 *         name: mode
 *         schema:
 *           type: string
 *         description: The mode of a workout
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Workout"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 */
v1workoutRouter.get("/", getAllWorkouts);

v1workoutRouter.get(
  "/:workoutId",
  param("workoutId").isUUID(4),
  getExistingWorkout
);

v1workoutRouter.get(
  "/:workoutId/records",
  param("workoutId").isUUID(4),
  getRecordForWorkoutController
);

v1workoutRouter.post(
  "/",
  jsonParser,
  body(["name", "mode", "equipment", "exercises", "trainerTips"])
    .notEmpty()
    .escape()
    .withMessage(
      "The following key (path) is missing or is empty in request body."
    ),
  checkExact(),
  createNewWorkout
);

v1workoutRouter.patch(
  "/:workoutId",
  param("workoutId").isUUID(4),
  jsonParser,
  body(["name", "mode", "equipment", "exercises", "trainerTips"])
    .notEmpty()
    .optional()
    .escape(),
  checkExact(),
  updateExistingWorkout
);

v1workoutRouter.delete(
  "/:workoutId",
  param("workoutId").isUUID(4),
  deleteExistingWorkout
);
