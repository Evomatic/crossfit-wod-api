import express, { Router } from "express";
import {
  getAllWorkouts,
  getExistingWorkout,
  updateExistingWorkout,
  createNewWorkout,
  deleteExistingWorkout,
} from "../controllers/workoutController";
import bodyParser from "body-parser";

const jsonParser = bodyParser.json();

export const v1workoutRouter: Router = express.Router();

v1workoutRouter.get("/", getAllWorkouts);

v1workoutRouter.get("/:workoutId", getExistingWorkout);

v1workoutRouter.post("/", jsonParser, createNewWorkout);

v1workoutRouter.patch("/:workoutId", jsonParser, updateExistingWorkout);

v1workoutRouter.delete("/:workoutId", deleteExistingWorkout);
