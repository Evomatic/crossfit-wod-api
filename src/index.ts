import express, { Express } from "express";
import apicache from "apicache";
import { v1workoutRouter } from "./v1/routes/workoutRoutes";

const app: Express = express();
const cache = apicache.middleware;
const PORT = process.env.PORT || 3000;

app.use("/api/v1/workouts", cache("2 minutes"), v1workoutRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
