import jwt from "jsonwebtoken";

import type { User } from "./";
import { UserModel } from "../../db/models/user";
import generateHash from "../../utils/generateHash";
import UnauthorizedError from "../errors/UnauthorizedError";

const login = async (user: Pick<User, "email" | "password">) => {
  const dbUser = await UserModel.findOne({
    email: user.email,
  });
  if (!dbUser)
    throw new UnauthorizedError("Invalid email password combination");

  const attemptHash = generateHash(user.password);

  if (attemptHash !== dbUser.password)
    throw new UnauthorizedError("Invalid email password combination");

  const token = jwt.sign(
    { id: dbUser.id, email: dbUser.email },
    process.env.JWT_SECRET_KEY!,
    {
      expiresIn: "1h",
    }
  );

  return {
    user: { email: user.email, id: dbUser.id, name: dbUser.name },
    token: token,
  };
};

export default login;
