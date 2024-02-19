import fs from "fs";
import { Workouts } from "./Workout";

export const saveToDatabase = (db: Workouts) => {
  fs.writeFileSync("./db.json", JSON.stringify(db, null, 2), {
    encoding: "utf-8",
  });
};

export const newDate = () =>
  new Date().toLocaleString("en-US", { timeZone: "UTC" });
