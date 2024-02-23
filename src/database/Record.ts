import db from "./db.json";

type Record = {
  id: string;
  workout: string;
  record: string;
};

type Records = Record[];

const records = db.records as Records;
export const getAllRecords = () => {
  try {
    return records;
  } catch (error) {
    if (error instanceof Error) {
      throw { status: 500, message: error?.message || error };
    }
  }
};
