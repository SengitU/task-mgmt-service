import { Request, Response } from "express";

import { getByUser } from "../../domain/task";
import { Task } from "../../db/models/task";
// TODO: get this authorid from session
type TaskRequestPayload = Pick<Task, "authorId">;

const getByUserHandler = async (
  req: Request<unknown, unknown, TaskRequestPayload>,
  res: Response<Omit<Task, "updatedAt">[]>
) => {
  const task = req.body;
  console.log({ task });

  const tasks = await getByUser(task.authorId);

  res.status(200).json(tasks).send();
};

export default getByUserHandler;
