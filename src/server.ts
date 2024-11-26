import express from "express";
import cors from "cors";
import expressJSDocSwagger from "express-jsdoc-swagger";

import { taskRoute, userRoute, healthcheckRoute } from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import { errorLogger } from "./middlewares/errorLogger";

const docOptions = {
  info: {
    title: "Task Management Service",
    version: "1.0.0",
    description:
      "This is task management service where logged in users can access to their tasks",
  },
  filesPattern: "./**/*.ts",
  baseDir: __dirname,
  swaggerUIPath: "/api-docs",
  exposeSwaggerUI: true,
};

const app: express.Application = express();
app.set('x-powered-by', false)
expressJSDocSwagger(app)(docOptions);

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use(userRoute);
app.use(taskRoute);
app.use(healthcheckRoute);

app.use(errorLogger);
app.use(errorHandler);

const start = () => {
  app.listen(3000, async () => {
    console.log("App is listening on port 3000!");
  });
  // graceful shutdown?
};

export default { start };
