import { Router } from "express";

import createUserHandler from "./create";
import updatePasswordHandler from "./updatePassword";
import loginHandler from "./login";

const userRoute = Router();

userRoute.put("/user", updatePasswordHandler);
userRoute.post("/user", createUserHandler);
userRoute.post("/login", loginHandler);

export default userRoute;
