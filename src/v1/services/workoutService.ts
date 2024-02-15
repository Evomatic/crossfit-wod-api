import { getAllWorkouts } from "../../database/Workout";
import { NewWorkout } from "../../database/Workout";
export const getAllWorkoutsService = () => {
  const allWorkouts = getAllWorkouts();
  return allWorkouts;
};

export const getExistingWorkoutService = () => {
  return;
};

export const createNewWorkoutService = (newWorkout: NewWorkout) => {
  return newWorkout;
};

export const updateExistingWorkoutService = () => {
  return;
};

export const deleteExistingWorkoutService = () => {
  return;
};
