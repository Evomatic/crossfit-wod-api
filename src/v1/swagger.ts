import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  defintion: {
    openapi: "3.0.0",
    info: { title: "Crossfit WOD API", version: "1.0.0" },
    apis: [
      "./routes/workoutRoutes.ts",
      "../database/Workout.ts",
      "./routes/recordsRoutes.ts",
      "../database/Record.ts",
    ],
  },
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
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
