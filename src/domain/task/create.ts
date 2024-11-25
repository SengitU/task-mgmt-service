// TODO: acquire type User from somewhere else
import sequence from "../../db/models/sequence";
import { type Task, TaskStatus } from "./";
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
    updatedAt: newTask.updatedAt,
    authorId: newTask.authorId,
  };
};

export default createTask;
