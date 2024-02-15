import db from "./db.json";
import { saveToDatabase } from "./utils";

export type Workout = {
  id: string;
  name: string;
  mode: string;
  equipment: string[];
  exercises: string[];
  createdAt: string;
  updatedAt: string;
  trainerTips: string[];
};

export type NewWorkout = Omit<Workout, "id" | "createdAt" | "updatedAt">;

export type Workouts = Workout[];

const workouts = db.workouts as Workouts;

export const getAllWorkouts = () => {
  return workouts;
};

export const createNewWorkout = (newWorkout: Workout) => {
  const isAlreadyAdded =
    workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;
  if (isAlreadyAdded) return;
  workouts.push(newWorkout);
  saveToDatabase(workouts);
  return newWorkout;
};
