import { Schema, model } from "mongoose";

import type { User } from "../../domain/user";

const userSchema = new Schema<User>({
  id: { type: Number, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  name: { type: String },
  password: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

userSchema.index({ id: 1, email: 1 });

export const UserModel = model("User", userSchema);
