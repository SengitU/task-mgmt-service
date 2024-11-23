// TODO: acquire type Task from somewhere else
import { Task } from "../../db/models/task";
import TaskModel from "../../db/models/task";
import NotFoundError from "../errors/NotFoundError";

const updateTask = async (
  taskId: number,
  authorId: number,
  updates: Partial<Pick<Task, "description" | "title" | "dueAt" | "status">>
) => {
  const updatedTask = await TaskModel.findOneAndUpdate(
    {
      id: taskId,
      authorId,
    },
    { ...updates, updatedAt: new Date() },
    {
      new: true,
    }
  );

  if (!updatedTask) throw new NotFoundError("Task not found");
  return {
    id: updatedTask.id,
    title: updatedTask.title,
    description: updatedTask.description,
    status: updatedTask.status,
    dueAt: updatedTask.dueAt,
    createdAt: updatedTask.createdAt,
    authorId: updatedTask.authorId,
  };
};

export default updateTask;
