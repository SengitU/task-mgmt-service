import type { User } from "./";
import { UserModel } from "../../db/models/user";
import sequence from "../../db/models/sequence";
import generateHash from "../../utils/generateHash";
import ConstraintError from "../errors/ConstraintError";

const createUser = async (user: User) => {
  try {
    const newUser = await UserModel.create({
      ...user,
      id: await sequence.next("user"),
      password: generateHash(user.password),
    });

    return {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    };
  } catch (err) {
    throw new ConstraintError("Email address already exists");
  }
};

export default createUser;
