import { Router } from "express";

import createUserHandler from "./create";
import updatePasswordHandler from "./updatePassword";
import loginHandler from "./login";

const userRoute = Router();

/**
 * User
 * @typedef {object} User
 * @property {string} email.required - Email address for the account
 * @property {string} password.required - Password for the account
 * @property {string} name.required - Name
 */

/**
 * POST /user
 * @summary Creates a new user
 * @param {User} request.body.required
 * @return {object} 201 - created user - application/json
 * @example response - 201 - created user example
 * { "name": "Ugurcan", "id": 5, "email":"test@example.com" }
 */
userRoute.post("/user", createUserHandler);
/**
 * POST /login
 * @summary Authenticates the user
 * @param {object} request.body.email.required - Email address for the account
 * @param {object} request.body.password.required - Password for the account
 * @return {object} 200 - jwt token created - application/json
 * @example response - 200 - created user example
 *  { "user": { "name": "Ugurcan", "id": 5, "email":"test@example.com" }, "token": "JWT_TOKEN" }
 */
userRoute.post("/login", loginHandler);
/**
 * PUT /user
 * @summary Updates user password
 * @param {string} request.headers.Authorization.required - JWT token for authenticated user
 * @return 200 - OK
 * @return {object} 400 - Error Message - application/json
 * @example response - 400 - error example
 * { message: "error happened" }
 */
userRoute.put("/user", updatePasswordHandler);

export default userRoute;
