import {
  getAllRecords,
  getExistingRecord,
  getRecordForWorkout,
  createNewRecord,
} from "../../database/Record";
import { WorkoutFilterParams, Record } from "../../types";

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

export const getExistingRecordService = (recordId: string) => {
  try {
    const existingRecord = getExistingRecord(recordId);
    return existingRecord;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createNewRecordService = (record: Record) => {
  try {
    const newRecord = createNewRecord(record);
    return newRecord;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
