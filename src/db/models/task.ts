import { Schema, Model } from "mongoose";

const taskSchema = new Schema({
  title: String,
  description: String,
  status: {
    type: String,
    enum: ["OPEN", "CLOSED"],
  },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

const UserModel = new Model("User", taskSchema);

export default UserModel;
