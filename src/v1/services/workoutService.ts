import {
  Workout,
  getAllWorkouts,
  createNewWorkout,
  getExistingWorkout,
  updateExistingWorkout,
  deleteExistingWorkout,
} from "../../database/Workout";
import { v4 as uuidv4 } from "uuid";
import { newDate } from "../../database/utils";

export const getAllWorkoutsService = () => {
  try {
    const allWorkouts = getAllWorkouts();
    return allWorkouts;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getExistingWorkoutService = (workoutId: string) => {
  try {
    const existingWorkout = getExistingWorkout(workoutId);
    return existingWorkout;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createNewWorkoutService = (newWorkout: Workout) => {
  const workoutToInsert = {
    ...newWorkout,
    id: uuidv4(),
    createdAt: newDate(),
    updatedAt: newDate(),
  };
  try {
    const createdWorkout = createNewWorkout(workoutToInsert);
    return createdWorkout;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateExistingWorkoutService = (
  workoutId: string,
  body: Workout
) => {
  const updatedWorkout = updateExistingWorkout(workoutId, body);
  return updatedWorkout;
};

export const deleteExistingWorkoutService = (workoutId: string) => {
  const deleteWorkout = deleteExistingWorkout(workoutId);
  return deleteWorkout;
};
