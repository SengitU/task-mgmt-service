import express from "express";

import { taskRoute, userRoute } from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import { errorLogger } from "./middlewares/errorLogger";

const app: express.Application = express();

app.use(express.json());

app.use(userRoute);
app.use(taskRoute);

app.use(errorLogger);
app.use(errorHandler);

const start = () => {
  app.listen(3000, async () => {
    console.log("App is listening on port 3000!");
  });
  // graceful shutdown?
};

export default { start };
