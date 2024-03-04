import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Crossfit WOD API", version: "1.0.0" },
  },
  apis: [
    "./src/v1/routes/workoutRoutes.ts",
    "./src/database/Workout.ts",
    "./src/v1/routes/recordsRoutes.ts",
    "./src/database/Record.ts",
  ],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app: Express, port: string | number) => {
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get("/api/v1/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(
    `Version 1 Docs are available on http://localhost:${port}/api/v1/docs`
  );
};

export default swaggerDocs;
