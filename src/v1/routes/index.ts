import express, { Response, Request, Router } from "express";

export const v1Router: Router = express.Router();

v1Router.route("/").get((req: Request, res: Response) => {
  res.send(`<h2>Hello from ${req.baseUrl}</h2>`);
});
