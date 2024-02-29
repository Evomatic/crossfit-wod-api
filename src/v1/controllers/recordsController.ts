import {
  createNewRecordService,
  getAllRecordsService,
  getExistingRecordService,
  getRecordForWorkoutService,
} from "../services/recordsService";
import { Request, Response } from "express";
import { StatusError } from "../../types";
import { validationResult } from "express-validator";
import { RecordFilterParams, Record } from "../../types";

export const getRecordForWorkoutController = (req: Request, res: Response) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const {
      params: { workoutId },
    } = req;
    try {
      const allRecords = getRecordForWorkoutService(workoutId);
      return res.status(200).send(allRecords);
    } catch (error) {
      if (error instanceof StatusError) {
        return res
          .status(error?.status || 500)
          .send({ status: "FAILED", error: error?.message || error });
      }
    }
  }
  return res.status(400).send({ errors: result.array() });
};

export const getAllRecordsController = (req: Request, res: Response) => {
  const { length, sort } = req.query as RecordFilterParams;
  try {
    const allRecords = getAllRecordsService({ length, sort });
    return res.status(200).send(allRecords);
  } catch (error) {
    if (error instanceof StatusError) {
      return res
        .status(error?.status || 500)
        .send({ status: "FAILED", error: error?.message || error });
    }
  }
};

export const getExistingRecordController = (req: Request, res: Response) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const {
      params: { recordId },
    } = req;
    try {
      const existingRecord = getExistingRecordService(recordId);
      return res.status(200).send(existingRecord);
    } catch (error) {
      if (error instanceof StatusError) {
        return res
          .status(error?.status || 500)
          .send({ status: "FAILED", error: error?.message || error });
      }
    }
  }
  return res.status(400).send({ errors: result.array() });
};

export const createNewRecordController = (req: Request, res: Response) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const {
      body: { id, workout, record },
    } = req;

    const newRecord: Record = {
      id,
      workout,
      record,
    };

    try {
      const createNewRecord = createNewRecordService(newRecord);
      return res.status(201).send(createNewRecord);
    } catch (error) {
      if (error instanceof StatusError) {
        return res
          .status(error?.status || 500)
          .send({ status: "FAILED", error: error?.message || error });
      }
    }
  }
  return res.status(400).send({ error: result.array() });
};
