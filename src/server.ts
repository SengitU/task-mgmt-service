import express from "express";

import { userRoute } from "./routes";

const app: express.Application = express();

app.use(userRoute);

const start = () => {
  app.listen(3000, async () => {
    console.log("App is listening on port 3000!");
  });
  // graceful shutdown?
};

export default { start };
