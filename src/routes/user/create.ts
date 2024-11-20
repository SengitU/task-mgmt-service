import { Request, Response } from "express";

const createUserHandler = (req: Request, res: Response) => {
  console.log("attempting to create user");
};

export default createUserHandler;
