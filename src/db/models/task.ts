import { Schema, model } from "mongoose";

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

const taskSchema = new Schema<Task>({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["OPEN", "CLOSED"],
    required: true,
  },
  authorId: { type: Number, required: true },
  dueAt: { type: Date, required: true },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

const TaskModel = model("Task", taskSchema);

export default TaskModel;
