import express, { Router } from "express";
import {
  getAllWorkouts,
  getExistingWorkout,
  updateExistingWorkout,
  createNewWorkout,
  deleteExistingWorkout,
} from "../controllers/workoutController";
import bodyParser from "body-parser";
import { check, param } from "express-validator";

const jsonParser = bodyParser.json();

export const v1workoutRouter: Router = express.Router();

v1workoutRouter.get("/", getAllWorkouts);

v1workoutRouter.get(
  "/:workoutId",
  param("workoutId").isUUID(4),
  getExistingWorkout
);

v1workoutRouter.post(
  "/",
  jsonParser,
  check(["name", "mode", "equipment", "exercises", "trainerTips"])
    .notEmpty()
    .escape()
    .withMessage(
      "The following key (path) is missing or is empty in request body."
    ),
  createNewWorkout
);

v1workoutRouter.patch(
  "/:workoutId",
  jsonParser,
  check(["name", "mode", "equipment", "exercises", "trainerTips"])
    .notEmpty()
    .optional()
    .escape(),
  updateExistingWorkout
);

v1workoutRouter.delete(
  "/:workoutId",
  param("workoutId").isUUID(4),
  deleteExistingWorkout
);
