import { Request, Response } from "express";
import { JSONSchemaType } from "ajv";

import { findByUser, type Task } from "../../domain/task";
import { authorize, AuthorizedRequest } from "../../middlewares/authorize";
import { secure } from "../../middlewares/secure";

type FindTaskRequestQuery = {
  searchTerm?: string;
};

const findTaskParamsSchema: JSONSchemaType<FindTaskRequestQuery> = {
  type: "object",
  properties: {
    searchTerm: { type: "string", maxLength: 50, nullable: true },
  },
  additionalProperties: false,
};

const findAllByUserHandler = async (
  req: Request<unknown, unknown, unknown, FindTaskRequestQuery>,
  res: Response<Omit<Task, "updatedAt">[]>
) => {
  const searchTerm = req.query.searchTerm;
  const tasks = await findByUser(
    (req as unknown as AuthorizedRequest).user.id,
    searchTerm
  );

  res.status(200).json(tasks).send();
};

export default [authorize, secure(findAllByUserHandler)];
