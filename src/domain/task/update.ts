// TODO: acquire type User from somewhere else
import { Task, TaskStatus } from "../../db/models/task";
import TaskModel from "../../db/models/task";

const createTask = async (task: Task) => {
  const newTask = await TaskModel.create({
    ...task,
    status: TaskStatus.OPEN,
  });

  return {
    title: newTask.title,
    description: newTask.description,
    status: newTask.status,
    dueAt: newTask.dueAt,
  };
};

export default createTask;
