import { Request, Response } from "express";
import { JSONSchemaType } from "ajv";

import { validate } from "../../middlewares/validate";
import { secure } from "../../middlewares/secure";
import { type User, createUser } from "../../domain/user";

const emailValidatorPattern = "^[-\\w.]+@([-\\w]+.)+[-\\w]{2,4}$";

const createUserSchema: JSONSchemaType<
  Pick<User, "email" | "password" | "name">
> = {
  type: "object",
  properties: {
    email: {
      type: "string",
      pattern: emailValidatorPattern,
      errorMessage: "Must be a valid email address",
    },
    password: { type: "string", minLength: 8, maxLength: 32 },
    name: { type: "string", minLength: 2, maxLength: 32 },
  },
  required: ["email", "password", "name"],
  additionalProperties: false,
};

const createUserHandler = async (
  req: Request<unknown, unknown, User>,
  res: Response<Partial<User>>
) => {
  const user = req.body;

  const newUser = await createUser(user);

  res.status(201).json(newUser);
};

export default [validate(createUserSchema), secure(createUserHandler)];
