import { getRecordForWorkout } from "../../database/Record";

export const getRecordForWorkoutService = (workoutId: string) => {
  try {
    const recordForWorkout = getRecordForWorkout(workoutId);
    return recordForWorkout;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
