import db from "./db.json";
import { saveToDatabase, newDate } from "./utils";

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

export class StatusError extends Error {
  status: number | undefined;
}

export type Workouts = Workout[];

const workouts = db.workouts as Workouts;

function filterWorkoutById(workoutId: string) {
  return workouts.filter((workout) => workout.id === workoutId);
}

export const getAllWorkouts = () => {
  try {
    return workouts;
  } catch (error) {
    if (error instanceof Error) {
      throw { status: 500, message: error?.message || error };
    }
  }
};

export const createNewWorkout = (newWorkout: Workout) => {
  const isAlreadyAdded =
    workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;
  if (isAlreadyAdded) {
    const statusError = new StatusError();
    statusError.status = 400;
    statusError.message = `Workout with the name ${newWorkout.name} already exists.`;
    throw statusError;
  }
  try {
    workouts.push(newWorkout);
    saveToDatabase(workouts);
    return newWorkout;
  } catch (error) {
    if (error instanceof Error) {
      throw { status: 500, message: error?.message || error };
    }
  }
};

export const getExistingWorkout = (workoutId: string) => {
  let result: Workouts = [];
  try {
    result = filterWorkoutById(workoutId);
  } catch (error) {
    if (error instanceof Error) {
      throw { status: 500, message: error?.message || error };
    }
  }
  if (result.length === 0) {
    const statusError = new StatusError();
    statusError.status = 404;
    statusError.message = `Workout not found.`;
    throw statusError;
  }
  const [workout] = result;
  return workout;
};

export const updateExistingWorkout = (workoutId: string, body: Workout) => {
  let result: Workouts = [];
  try {
    result = filterWorkoutById(workoutId);
  } catch (error) {
    if (error instanceof Error) {
      throw { status: 500, message: error?.message || error };
    }
  }
  if (result.length === 0) {
    const statusError = new StatusError();
    statusError.status = 404;
    statusError.message = `Workout not found.`;
    throw statusError;
  }
  const [workout] = result;

  for (const [key, value] of Object.entries(body)) {
    if (Object.hasOwn(workout, key)) {
      workout[key] = value;
      workout["updatedAt"] = newDate();
    }
  }
  const index = workouts.indexOf(workout);
  workouts.splice(index, 1, workout);
  saveToDatabase(workouts);
  return workout;
};

export const deleteExistingWorkout = (workoutId: string) => {
  let result: Workouts = [];
  try {
    result = workouts.filter((workout) => workout.id !== workoutId);
  } catch (error) {
    if (error instanceof Error) {
      throw { status: 500, message: error?.message || error };
    }
  }
  if (result.length === workouts.length) {
    const statusError = new StatusError();
    statusError.status = 404;
    statusError.message = `Workout not found.`;
    throw statusError;
  }
  saveToDatabase(result);
  return "Workout deleted!";
};
