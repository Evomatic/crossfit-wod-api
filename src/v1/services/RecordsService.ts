import { getAllRecords } from "../../database/Record";

export const getAllRecordsService = () => {
  try {
    const allRecords = getAllRecords();
    return allRecords;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
