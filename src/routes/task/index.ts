import { Router } from "express";

import createTaskHandler from "./create";
import getByUserHandler from "./getByUser";

const taskRoute = Router();

taskRoute.post("/task", createTaskHandler);
taskRoute.get("/task", getByUserHandler);

export default taskRoute;
