import jwt from "jsonwebtoken";

// TODO: acquire type User from somewhere else
import type { User } from "../../db/models/user";
import UserModel from "../../db/models/user";
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
    process.env.JWT_SECRET_KEY as string,
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
