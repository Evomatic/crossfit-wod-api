import { Request, Response } from "express";

export const getAllWorkouts = (req: Request, res: Response) => {
  res.send("Get all workouts");
};

export const getExistingWorkout = (req: Request, res: Response) => {
  res.send("Get an existing workout");
};

export const createNewWorkout = (req: Request, res: Response) => {
  res.send("Create a new workout");
};

export const updateExistingWorkout = (req: Request, res: Response) => {
  res.send("Update existing workout");
};

export const deleteExistingWorkout = (req: Request, res: Response) => {
  res.send("Delete an existing workout");
};
