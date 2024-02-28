import express, { Router } from "express";
import { jsonParser } from "../../database/utils";
import { param, checkExact, body } from "express-validator";
import { getAllRecordsController } from "../controllers/recordsController";

export const v1recordRouter: Router = express.Router();

v1recordRouter.get("/", getAllRecordsController);
