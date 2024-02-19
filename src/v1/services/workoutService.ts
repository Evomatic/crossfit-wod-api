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
  const allWorkouts = getAllWorkouts();
  return allWorkouts;
};

export const getExistingWorkoutService = (workoutId: string) => {
  const existingWorkout = getExistingWorkout(workoutId);
  return existingWorkout;
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
    return error;
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
