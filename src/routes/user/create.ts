import { Request, Response } from "express";

import { createUser } from "../../domain/user";
import { User } from "../../db/models/user";

const createUserHandler = async (
  req: Request<unknown, unknown, User>,
  res: Response<Partial<User>>
) => {
  const user = req.body;
  console.log({ body: req.body });
  const newUser = await createUser(user);

  res.status(201).json(newUser).send();
};

export default createUserHandler;
