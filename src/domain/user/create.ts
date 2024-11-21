// TODO: acquire type User from somewhere else
import type { User } from "../../db/models/user";
import UserModel from "../../db/models/user";
import sequence from "../../db/models/sequence";
import generateHash from "../../utils/generateHash";

const createUser = async (user: User) => {
  try {
    const newUser = await UserModel.create({
      ...user,
      id: await sequence.next('user'),
      password: generateHash(user.password),
    });

    return {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    };
  } catch (err) {
    console.log(err);
    throw Error("Email address already exists");
  }
};

export default createUser;