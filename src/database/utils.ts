import fs from "fs";
import bodyParser from "body-parser";
import { Workouts } from "../types";

export const saveToDatabase = (db: Workouts) => {
  fs.writeFileSync("./db.json", JSON.stringify(db, null, 2), {
    encoding: "utf-8",
  });
};

export const newDate = () =>
  new Date().toLocaleString("en-US", { timeZone: "UTC" });

export const jsonParser = bodyParser.json();
