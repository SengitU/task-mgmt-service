import { Router } from "express";

import createUserHandler from "./create";
import updateUserHandler from "./update";
import getUserHandler from "./get";

const userRoute = Router();

userRoute.get("/user", getUserHandler);
userRoute.put("/user", updateUserHandler);
userRoute.post("/user", createUserHandler);

export default userRoute;
