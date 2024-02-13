import express, { Router } from "express";
import {
  getAllWorkouts,
  getExistingWorkout,
  updateExistingWorkout,
  createNewWorkout,
  deleteExistingWorkout,
} from "../controllers/workoutController";

export const v1workoutRouter: Router = express.Router();

v1workoutRouter.get("/", getAllWorkouts);

v1workoutRouter.get("/:workoutId", getExistingWorkout);

v1workoutRouter.post("/", updateExistingWorkout);

v1workoutRouter.patch("/:workoutId", createNewWorkout);

v1workoutRouter.delete("/:workoutId", deleteExistingWorkout);
