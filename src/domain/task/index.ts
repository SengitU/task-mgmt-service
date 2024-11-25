export const TaskStatus = {
  CLOSED: "CLOSED",
  OPEN: "OPEN",
} as const;

export type Task = {
  id: number;
  title: string;
  description: string;
  status: keyof typeof TaskStatus;
  authorId: number;
  dueAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export { default as createTask } from "./create";
export { default as findByUser } from "./findByUser";
export { default as updateTask } from "./update";
