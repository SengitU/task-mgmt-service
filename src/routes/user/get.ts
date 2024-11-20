import { Request, Response } from "express";

const getUserHandler = (req: Request, res: Response) => {
  console.log("attempting to return user");
};

export default getUserHandler;
