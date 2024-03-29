import { RecordFilterParams, Records } from "../types";
import { StatusError, Record } from "../types";
import db from "./db.json";
import { saveToDatabase } from "./utils";

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
    } else if (filterParams.sort) {
      return records.toSorted((recordA, recordB) => {
        if (recordA.createdAt && recordB.createdAt) {
          const dateA = new Date(recordA.createdAt);
          const dateB = new Date(recordB.createdAt);
          if (filterParams.sort === "-createdat") {
            return dateB.getTime() - dateA.getTime();
          }
          return dateA.getTime() - dateB.getTime();
        }
        return -1;
      });
    }
    return records;
  } catch (error) {
    if (error instanceof Error) {
      throw { status: 500, message: error?.message || error };
    }
  }
};

export const getExistingRecord = (recordId: string) => {
  let result: Records = [];
  try {
    result = records.filter((record) => record.id === recordId);
  } catch (error) {
    if (error instanceof Error) {
      throw { status: 500, message: error?.message || error };
    }
  }
  if (result.length === 0) {
    const statusError = new StatusError();
    statusError.status = 404;
    statusError.message = `Record with id ${recordId} does not exist.`;
    throw statusError;
  }
  const [record] = result;
  return record;
};

export const createNewRecord = (newRecord: Record) => {
  console.log(newRecord);
  const isAlreadyAdded =
    records.findIndex((record) => record.id === newRecord.id) > -1;
  console.log(isAlreadyAdded);
  if (isAlreadyAdded) {
    const statusError = new StatusError();
    statusError.status = 400;
    statusError.message = `Record with the id ${newRecord.id} already exists.`;
    throw statusError;
  }
  try {
    records.push(newRecord);
    saveToDatabase(records);
    return newRecord;
  } catch (error) {
    if (error instanceof Error) {
      throw { status: 500, message: error?.message || error };
    }
  }
};
//TODO Fix issue with inserting a new record that is already in the DB
