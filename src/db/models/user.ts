import { Schema, model } from "mongoose";

export type User = {
  id: number;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

const userSchema = new Schema<User>({
  id: { type: Number, unique: true, required: true},
  email: { type: String, unique: true, required: true },
  name: { type: String },
  password: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

const UserModel = model("User", userSchema);

export default UserModel;
