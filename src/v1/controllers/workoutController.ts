import {
  getAllWorkoutsService,
  getExistingWorkoutService,
  createNewWorkoutService,
  updateExistingWorkoutService,
  deleteExistingWorkoutService,
} from "../services/workoutService";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { StatusError } from "../../database/Workout";
import { FilterParams, Workout } from "../../types";

export const getAllWorkouts = (req: Request, res: Response) => {
  const { mode, equipment } = req.query as FilterParams;
  try {
    const allWorkouts = getAllWorkoutsService({ mode, equipment });
    return res.status(200).send(allWorkouts);
  } catch (error) {
    if (error instanceof StatusError) {
      return res
        .status(error?.status || 500)
        .send({ status: "FAILED", error: error?.message || error });
    }
  }
};

export const getExistingWorkout = (req: Request, res: Response) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const {
      params: { workoutId },
    } = req;
    try {
      const existingWorkout = getExistingWorkoutService(workoutId);
      return res.status(200).send(existingWorkout);
    } catch (error) {
      if (error instanceof StatusError) {
        return res
          .status(error?.status || 500)
          .send({ status: "FAILED", error: error?.message || error });
      }
    }
  }
  return res.status(400).send({ errors: result.array() });
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
      return res.status(201).send(createNewWorkout);
    } catch (error) {
      if (error instanceof StatusError) {
        return res
          .status(error?.status || 500)
          .send({ status: "FAILED", error: error?.message || error });
      }
    }
  }
  return res.status(400).send({ errors: result.array() });
};

export const updateExistingWorkout = (req: Request, res: Response) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const {
      params: { workoutId },
      body,
    } = req;
    try {
      const updateWorkout = updateExistingWorkoutService(workoutId, body);
      return res.status(201).send(updateWorkout);
    } catch (error) {
      if (error instanceof StatusError) {
        return res
          .status(error?.status || 500)
          .send({ status: "FAILED", error: error?.message || error });
      }
    }
  }
  return res.status(400).send({ errors: result.array() });
};

export const deleteExistingWorkout = (req: Request, res: Response) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const {
      params: { workoutId },
    } = req;
    try {
      const deleteWorkout = deleteExistingWorkoutService(workoutId);
      return res.status(200).send(deleteWorkout);
    } catch (error) {
      if (error instanceof StatusError) {
        return res
          .status(error?.status || 500)
          .send({ status: "FAILED", error: error?.message || error });
      }
    }
  }
  return res.status(400).send({ errors: result.array() });
};
