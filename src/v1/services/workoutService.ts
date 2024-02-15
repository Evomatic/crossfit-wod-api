import {
  NewWorkout,
  getAllWorkouts,
  createNewWorkout,
  getExistingWorkout,
} from "../../database/Workout";
import { v4 as uuidv4 } from "uuid";

const newDate = () => new Date().toLocaleString("en-US", { timeZone: "UTC" });

export const getAllWorkoutsService = () => {
  const allWorkouts = getAllWorkouts();
  return allWorkouts;
};

export const getExistingWorkoutService = (workoutId: string) => {
  const existingWorkout = getExistingWorkout(workoutId);
  return existingWorkout;
};

export const createNewWorkoutService = (newWorkout: NewWorkout) => {
  const workoutToInsert = {
    ...newWorkout,
    id: uuidv4(),
    createdAt: newDate(),
    updatedAt: newDate(),
  };
  const createdWorkout = createNewWorkout(workoutToInsert);
  return createdWorkout;
};

export const updateExistingWorkoutService = () => {
  return;
};

export const deleteExistingWorkoutService = () => {
  return;
};
