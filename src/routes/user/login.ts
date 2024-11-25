import { Request, Response } from "express";
import { JSONSchemaType } from "ajv";

import { type User, login } from "../../domain/user";
import { secure } from "../../middlewares/secure";
import { validate } from "../../middlewares/validate";

const emailValidatorPattern = "^[-\\w.]+@([-\\w]+.)+[-\\w]{2,4}$";

const loginUserSchema: JSONSchemaType<Pick<User, "email" | "password">> = {
  type: "object",
  properties: {
    email: {
      type: "string",
      pattern: emailValidatorPattern,
      errorMessage: "Must be a valid email address",
    },
    password: { type: "string", maxLength: 32 },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

const loginHandler = async (
  req: Request<unknown, unknown, Pick<User, "email" | "password">>,
  res: Response<Partial<{ user: Partial<User>; token: string }>>
) => {
  const user = req.body;
  const loggedInUser = await login(user);

  res.json(loggedInUser);
};

export default [validate(loginUserSchema), secure(loginHandler)];
