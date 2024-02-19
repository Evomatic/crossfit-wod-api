import {
  getAllWorkoutsService,
  getExistingWorkoutService,
  createNewWorkoutService,
  updateExistingWorkoutService,
  deleteExistingWorkoutService,
} from "../services/workoutService";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Workout } from "../../database/Workout";

interface ResponseError extends Error {
  status?: number;
}

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

    const newWorkout: Workout = {
      name,
      mode,
      equipment,
      exercises,
      trainerTips,
    };

    try {
      const createNewWorkout = createNewWorkoutService(newWorkout);
      return res.status(201).send({ status: "OK", data: createNewWorkout });
    } catch (error) {
      if (error instanceof Error) {
        return (
          res
            //TODO Fix TS error. Continue working on error handling for createNewWorkoutService
            .status(error?.status || 500)
            .send({
              status: "FAILED",
              data: { error: error?.message || error },
            })
        );
      }
    }
  }
  res.status(400).send({ errors: result.array() });
};

export const updateExistingWorkout = (req: Request, res: Response) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const {
      params: { workoutId },
      body,
    } = req;
    const updateWorkout = updateExistingWorkoutService(workoutId, body);
    return res.status(201).send({ status: "OK", data: updateWorkout });
  }
  res.send({ errors: result.array() });
};

export const deleteExistingWorkout = (req: Request, res: Response) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const {
      params: { workoutId },
    } = req;
    const deleteWorkout = deleteExistingWorkoutService(workoutId);
    res.status(201).send({ status: "OK", data: deleteWorkout });
  }
};
