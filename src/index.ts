import express, { Express } from "express";
import { v1workoutRouter } from "./v1/routes/workoutRoutes";
import { v1recordRouter } from "./v1/routes/recordsRoutes";

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use("/api/v1/workouts", v1workoutRouter);
app.use("/api/v1/records", v1recordRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
