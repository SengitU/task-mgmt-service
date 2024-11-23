import { Response, Request } from "express";
import { JSONSchemaType } from "ajv";

import { authorize, type AuthorizedRequest } from "../../middlewares/authorize";
import { secure } from "../../middlewares/secure";
import { validate } from "../../middlewares/validate";
import { createTask } from "../../domain/task";
import { Task } from "../../db/models/task";

type TaskRequestBody = Pick<Task, "title" | "description"> & {
  dueAt: string;
};

const createTaskSchema: JSONSchemaType<TaskRequestBody> = {
  type: "object",
  properties: {
    title: { type: "string", minLength: 2, maxLength: 100 },
    description: { type: "string", minLength: 5, maxLength: 300 },
    dueAt: { type: "string", format: "iso-date-time" },
  },
  required: ["title", "description", "dueAt"],
  additionalProperties: false,
};

const createTaskHandler = async (
  req: Request<unknown, unknown, TaskRequestBody>,
  res: Response<Partial<Task>>
) => {
  const task = req.body;

  const newTask = await createTask({
    ...task,
    authorId: (req as AuthorizedRequest).user.id,
    dueAt: new Date(task.dueAt),
  });
  // TODO: Add a link?
  res.status(201).json(newTask).send();
};

export default [
  authorize,
  validate(createTaskSchema),
  secure(createTaskHandler),
];
