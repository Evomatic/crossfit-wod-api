import { getAllWorkouts } from "../../database/Workout";

export const getAllWorkoutsService = () => {
  const allWorkouts = getAllWorkouts();
  return allWorkouts;
};

export const getExistingWorkoutService = () => {
  return;
};

export const createNewWorkoutService = () => {
  return;
};

export const updateExistingWorkoutService = () => {
  return;
};

export const deleteExistingWorkoutService = () => {
  return;
};
