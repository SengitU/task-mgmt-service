import { Request, Response } from "express";
import { JSONSchemaType } from "ajv";

import { authorize, AuthorizedRequest } from "../../middlewares/authorize";
import { secure } from "../../middlewares/secure";
import { validate } from "../../middlewares/validate";
import { updateTask } from "../../domain/task";
import { Task, TaskStatus } from "../../db/models/task";

type TaskRequestPayload = Pick<
  Task,
  "title" | "description" | "dueAt" | "status"
> & {
  dueAt: string;
};

const updatePasswordBodySchema: JSONSchemaType<TaskRequestPayload> = {
  type: "object",
  properties: {
    title: { type: "string", minLength: 2, maxLength: 100 },
    description: { type: "string", minLength: 5, maxLength: 300 },
    dueAt: { type: "string", format: "iso-date-time" },
    status: { type: "string", enum: [TaskStatus.CLOSED, TaskStatus.OPEN] },
  },
  required: ["title", "description", "dueAt"],
  additionalProperties: false,
};

const updateTaskHandler = async (
  req: Request<{ taskId: string }, unknown, TaskRequestPayload>,
  res: Response<Partial<Task>>
) => {
  const updates = req.body;
  const taskId = parseInt(req.params.taskId, 10);

  const updatedTask = await updateTask(
    taskId,
    (req as unknown as AuthorizedRequest).user.id,
    updates
  );

  res.status(200).json(updatedTask).send();
};

export default [
  authorize,
  validate(updatePasswordBodySchema),
  secure(updateTaskHandler),
];
