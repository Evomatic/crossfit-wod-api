import db from "./db.json";
import { saveToDatabase } from "./utils";

export type Workout = {
  id?: string;
  name?: string;
  mode?: string;
  equipment?: string[];
  exercises?: string[];
  createdAt?: string;
  updatedAt?: string;
  trainerTips?: string[];
};

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

export const getExistingWorkout = (workoutId: string) => {
  const result = workouts.filter((workout) => workout.id === workoutId);
  if (result.length === 0) return `Workout: ${workoutId} does not exist.`;
  const [workout] = result;
  return workout;
};

export const updateExistingWorkout = (workoutId: string, body: Workout) => {
  const result = workouts.filter((workout) => workout.id === workoutId);
  if (result.length === 0) return `Workout: ${workoutId} does not exist.`;
  const [workout] = result;

  for (const [key, value] of Object.entries(body)) {
    if (Object.hasOwn(workout, key)) {
      workout[key] = value;
      //TODO Finish business logic of what to do when patching workout
    }
  }
  return;
};
