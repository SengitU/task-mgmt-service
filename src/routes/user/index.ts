import { Router } from "express";

import createUserHandler from "./create";
import updatePasswordHandler from "./updatePassword";

const userRoute = Router();

userRoute.put("/user", updatePasswordHandler);
userRoute.post("/user", createUserHandler);

export default userRoute;
