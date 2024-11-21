// TODO: acquire type User from somewhere else
import sequence from "../../db/models/sequence";
import type { Task } from "../../db/models/task";
import { TaskStatus } from "../../db/models/task";
import TaskModel from "../../db/models/task";

type CreateTaskPayload = Pick<
  Task,
  "title" | "description" | "dueAt" | "authorId"
>;

const createTask = async (task: CreateTaskPayload) => {
  const newTask = await TaskModel.create({
    ...task,
    id: await sequence.next("task"),
    status: TaskStatus.OPEN,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return {
    id: newTask.id,
    title: newTask.title,
    description: newTask.description,
    status: newTask.status,
    dueAt: newTask.dueAt,
    createdAt: newTask.createdAt,
    authorId: newTask.authorId, // TODO
  };
};

export default createTask;
