import { RecordFilterParams } from "../types";
import { StatusError } from "./Workout";
import db from "./db.json";

type Record = {
  id: string;
  workout: string;
  record: string;
};

type Records = Record[];

const records = db.records as Records;
export const getRecordForWorkout = (workoutId: string) => {
  let results: Records = [];
  try {
    results = records.filter((record) => record.workout === workoutId);
  } catch (error) {
    if (error instanceof Error) {
      throw { status: 500, message: error?.message || error };
    }
  }
  if (results.length === 0) {
    const statusError = new StatusError();
    statusError.status = 404;
    statusError.message = `No records found for workout with id ${workoutId}.`;
    throw statusError;
  }
  return results;
};

export const getAllRecords = (filterParams: RecordFilterParams) => {
  try {
    if (filterParams.length) {
      return records.filter(
        (_, index) => filterParams.length && index < filterParams.length
      );
    }
    return records;
  } catch (error) {
    if (error instanceof Error) {
      throw { status: 500, message: error?.message || error };
    }
  }
};
