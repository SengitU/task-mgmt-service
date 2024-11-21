import { Request, Response } from "express";

import { createTask } from "../../domain/task";
import { Task } from "../../db/models/task";
// TODO: get this authorid from session
type TaskRequestPayload = Pick<Task, "title" | "description" | "authorId"> & {
  dueAt: string;
};

const createTaskHandler = async (
  req: Request<unknown, unknown, TaskRequestPayload>,
  res: Response<Partial<Task>>
) => {
  const task = req.body;

  const newTask = await createTask({
    ...task,
    dueAt: new Date(task.dueAt),
  });

  res.status(201).json(newTask).send();
};

export default createTaskHandler;
