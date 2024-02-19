import db from "./db.json";
import { saveToDatabase } from "./utils";

export type Workout = {
  [key: string]: string | string[] | undefined;
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

function filterWorkoutById(workoutId: string) {
  return workouts.filter((workout) => workout.id === workoutId);
}

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
  const result = filterWorkoutById(workoutId);
  if (result.length === 0) return `Workout: ${workoutId} does not exist.`;
  const [workout] = result;
  return workout;
};

export const updateExistingWorkout = (workoutId: string, body: Workout) => {
  const result = filterWorkoutById(workoutId);
  if (result.length === 0) return `Workout: ${workoutId} does not exist.`;
  const [workout] = result;

  for (const [key, value] of Object.entries(body)) {
    if (Object.hasOwn(workout, key)) {
      workout[key] = value;
    }
  }
  const index = workouts.indexOf(workout);
  workouts.splice(index, 1, workout);
  saveToDatabase(workouts);
  return workout;
};
