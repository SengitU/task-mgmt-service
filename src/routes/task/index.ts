import { Router } from "express";

import createHandler from "./create";
import updateHandler from "./update";
import findAllByUserHandler from "./findAllByUser";

const taskRoute = Router();

taskRoute.post("/task", createHandler);
taskRoute.get("/task", findAllByUserHandler);
taskRoute.put("/task/:taskId", updateHandler);

export default taskRoute;
