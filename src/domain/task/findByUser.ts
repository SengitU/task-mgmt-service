// TODO: acquire type User from somewhere else
import TaskModel from "../../db/models/task";

const createSearchQuery = (searchTerm?: string) => {
  if (searchTerm) return { $text: { $search: searchTerm } };
  return {};
};

const findByUser = async (authorId: number, searchTerm?: string) => {
  const tasks = await TaskModel.find({
    authorId: authorId,
    ...createSearchQuery(searchTerm),
  });
  return tasks.map((task) => ({
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    dueAt: task.dueAt,
    createdAt: task.createdAt,
    authorId: task.authorId,
  }));
};

export default findByUser;
