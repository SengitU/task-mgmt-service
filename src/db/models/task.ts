import { Schema, model } from "mongoose";

import type { Task } from "../../domain/task";

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
  createdAt: { type: Date, default: new Date(), required: true },
  updatedAt: { type: Date, default: new Date() },
});

taskSchema.index({ title: "text", description: "text" });
taskSchema.index({ id: 1, createdAt: 1 });
taskSchema.index({ authorId: 1, createdAt: 1 });

export const TaskModel = model("Task", taskSchema);
