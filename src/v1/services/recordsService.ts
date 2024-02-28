import { getAllRecords, getRecordForWorkout } from "../../database/Record";
import { WorkoutFilterParams } from "../../types";

export const getRecordForWorkoutService = (workoutId: string) => {
  try {
    const recordForWorkout = getRecordForWorkout(workoutId);
    return recordForWorkout;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllRecordsService = (filterParams: WorkoutFilterParams) => {
  try {
    const allRecords = getAllRecords(filterParams);
    return allRecords;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
