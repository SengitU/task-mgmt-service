// TODO: acquire type User from somewhere else
import TaskModel from "../../db/models/task";

const getByUser = async (authorId: number) => {
  const tasks = await TaskModel.find({
    authorId: authorId,
  });
  console.log(typeof authorId)

  return tasks.map((task) => ({
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    dueAt: task.dueAt,
    createdAt: task.createdAt,
    authorId: task.authorId, // TODO
  }))
};

export default getByUser;
