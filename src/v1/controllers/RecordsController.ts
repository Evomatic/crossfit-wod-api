import { getAllRecordsService } from "../services/RecordsService";
import { Request, Response } from "express";
import { StatusError } from "../../database/Workout";

export const getAllRecordsController = (req: Request, res: Response) => {
  try {
    const allRecords = getAllRecordsService();
    return res.status(200).send(allRecords);
  } catch (error) {
    if (error instanceof StatusError) {
      return res
        .status(error?.status || 500)
        .send({ status: "FAILED", message: error?.message || error });
    }
  }
};
