import {
  getAllWorkoutsService,
  getExistingWorkoutService,
  createNewWorkoutService,
  updateExistingWorkoutService,
  deleteExistingWorkoutService,
} from "../services/workoutService";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { NewWorkout } from "../../database/Workout";

export const getAllWorkouts = (req: Request, res: Response) => {
  const allWorkouts = getAllWorkoutsService();
  res.send({ status: "OK", data: allWorkouts });
};

export const getExistingWorkout = (req: Request, res: Response) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const {
      params: { workoutId },
    } = req;
    const existingWorkout = getExistingWorkoutService(workoutId);
    return res.status(200).send({ status: "OK", data: existingWorkout });
  }
  res.send({ errors: result.array() });
};

export const createNewWorkout = (req: Request, res: Response) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const {
      body: { name, mode, equipment, exercises, trainerTips },
    } = req;

    const newWorkout: NewWorkout = {
      name,
      mode,
      equipment,
      exercises,
      trainerTips,
    };

    const createNewWorkout = createNewWorkoutService(newWorkout);

    return res.status(201).send({ status: "OK", data: createNewWorkout });
  }
  res.send({ errors: result.array() });
};

export const updateExistingWorkout = (req: Request, res: Response) => {
  const updateWorkout = updateExistingWorkoutService();
  res.send("Update existing workout");
};

export const deleteExistingWorkout = (req: Request, res: Response) => {
  const deleteWorkout = deleteExistingWorkoutService();
  res.send("Delete an existing workout");
};
