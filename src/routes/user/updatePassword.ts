import { Request, Response } from "express";
import { User } from "../../db/models/user";
import updatePassword from "../../domain/user/updatePassword";

const updateUserHandler = async (
  req: Request<
    unknown,
    unknown,
    Pick<User, "email" | "password"> & { newPassword: string }
  >,
  res: Response<void>
) => {
  const { newPassword, ...user } = req.body;

  await updatePassword(user, newPassword);

  res.status(200).send();
};

export default updateUserHandler;
