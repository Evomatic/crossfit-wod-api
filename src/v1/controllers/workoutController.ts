import {
  getAllWorkoutsService,
  getExistingWorkoutService,
  createNewWorkoutService,
  updateExistingWorkoutService,
  deleteExistingWorkoutService,
} from "../services/workoutService";

import { Request, Response } from "express";

export const getAllWorkouts = (req: Request, res: Response) => {
  const allWorkouts = getAllWorkoutsService();
  res.send("Get all workouts");
};

export const getExistingWorkout = (req: Request, res: Response) => {
  const existingWorkout = getExistingWorkoutService();
  res.send("Get an existing workout");
};

export const createNewWorkout = (req: Request, res: Response) => {
  const newWorkout = createNewWorkoutService();
  res.send("Create a new workout");
};

export const updateExistingWorkout = (req: Request, res: Response) => {
  const updateWorkout = updateExistingWorkoutService();
  res.send("Update existing workout");
};

export const deleteExistingWorkout = (req: Request, res: Response) => {
  const deleteWorkout = deleteExistingWorkoutService();
  res.send("Delete an existing workout");
};
