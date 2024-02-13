import express, { Router, Request, Response } from "express";

export const v1workoutRouter: Router = express.Router();

v1workoutRouter.get("/", (req: Request, res: Response) => {
  res.send("get all workouts");
});

v1workoutRouter.get("/:workoutId", (req: Request, res: Response) => {
  res.send("Get an existing workout");
});

v1workoutRouter.post("/", (req: Request, res: Response) => {
  res.send("Create a new workout");
});

v1workoutRouter.patch("/:workoutId", (req: Request, res: Response) => {
  res.send("Update an existing workout");
});

v1workoutRouter.delete("/:workoutId", (req: Request, res: Response) => {
  res.send("Delete an existing workout");
});
