import generateHash from "../../utils/generateHash";
import type { User } from "../../db/models/user";
import UserModel from "../../db/models/user";

const updatePassword = async (
  user: Pick<User, "email" | "password">,
  newPassword: string
) => {
  console.log({ user });
  const existingUser = await UserModel.findOne({
    email: user.email,
  });
  console.log({ existingUser });
  // Maybe implement NotFoundError
  if (!existingUser) throw new Error("Not Found");

  const oldPasswordHash = generateHash(user.password);
  // TODO: Unauth exception?
  if (oldPasswordHash !== existingUser.password) throw new Error("Unauth");
  const newPasswordHash = generateHash(newPassword);

  await UserModel.updateOne({
    email: user.email,
    password: newPasswordHash,
  });
};

export default updatePassword;
