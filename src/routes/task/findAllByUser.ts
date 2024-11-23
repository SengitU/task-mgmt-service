import { Response } from "express";

import { findByUser } from "../../domain/task";
import { Task } from "../../db/models/task";
import { authorize, AuthorizedRequest } from "../../middlewares/authorize";
import { secure } from "../../middlewares/secure";

const findAllByUserHandler = async (
  req: AuthorizedRequest,
  res: Response<Omit<Task, "updatedAt">[]>
) => {
  const tasks = await findByUser(req.user.id);

  res.status(200).json(tasks).send();
};

export default [authorize, secure(findAllByUserHandler)];
