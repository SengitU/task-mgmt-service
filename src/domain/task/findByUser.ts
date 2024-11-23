// TODO: acquire type User from somewhere else
import TaskModel from "../../db/models/task";

const findByUser = async (authorId: number) => {
  const tasks = await TaskModel.find({
    authorId: authorId,
  });
  return tasks.map((task) => ({
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    dueAt: task.dueAt,
    createdAt: task.createdAt,
    authorId: task.authorId,
  }))
};

export default findByUser;
