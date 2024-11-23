import { Request, Response } from "express";
import { JSONSchemaType } from "ajv";

import { authorize, AuthorizedRequest } from "../../middlewares/authorize";
import { secure } from "../../middlewares/secure";
import { validate } from "../../middlewares/validate";
import { User } from "../../db/models/user";
import updatePassword from "../../domain/user/updatePassword";

type UpdateUserRequestBody = Pick<User, "password"> & { newPassword: string };

const updatePasswordSchema: JSONSchemaType<UpdateUserRequestBody> = {
  type: "object",
  properties: {
    password: { type: "string", minLength: 8, maxLength: 32 },
    newPassword: { type: "string", minLength: 8, maxLength: 32 },
  },
  required: ["password", "newPassword"],
  additionalProperties: false,
};

const updateUserHandler = async (
  req: Request<unknown, unknown, UpdateUserRequestBody>,
  res: Response<void>
) => {
  const { newPassword, password } = req.body;

  await updatePassword(
    {
      password,
      email: (req as AuthorizedRequest).user.email,
    },
    newPassword
  );

  res.status(200).send();
};

export default [
  authorize,
  validate(updatePasswordSchema),
  secure(updateUserHandler),
];
