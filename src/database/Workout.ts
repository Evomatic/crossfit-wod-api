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
  if (isAlreadyAdded) {
    throw {
      status: 400,
      message: `Workout with the name ${newWorkout.name}`,
    };
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
      workout["updatedAt"] = newDate();
    }
  }
  const index = workouts.indexOf(workout);
  workouts.splice(index, 1, workout);
  saveToDatabase(workouts);
  return workout;
};

export const deleteExistingWorkout = (workoutId: string) => {
  const result = workouts.filter((workout) => workout.id !== workoutId);
  if (result.length === workouts.length)
    return `Workout: ${workoutId} does not exist.`;
  saveToDatabase(result);
  return "Workout deleted!";
};
