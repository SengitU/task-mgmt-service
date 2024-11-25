import type { User } from "./";
import generateHash from "../../utils/generateHash";
import UserModel from "../../db/models/user";
import NotFoundError from "../errors/NotFoundError";
import UnauthorizedError from "../errors/UnauthorizedError";

const updatePassword = async (
  user: Pick<User, "email" | "password">,
  newPassword: string
) => {
  const existingUser = await UserModel.findOne({
    email: user.email,
  });
  // This case should never happen as user is already logged in
  if (!existingUser) throw new NotFoundError("User not found");

  const oldPasswordHash = generateHash(user.password);

  if (oldPasswordHash !== existingUser.password)
    throw new UnauthorizedError("Password is incorrect");
  const newPasswordHash = generateHash(newPassword);

  await UserModel.updateOne({
    email: user.email,
    password: newPasswordHash,
  });
};

export default updatePassword;
