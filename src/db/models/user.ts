import mongoose, { Schema, Model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
  email: { type: String, unique: true },
});

const UserModel = new Model("User", userSchema);

export default UserModel;
