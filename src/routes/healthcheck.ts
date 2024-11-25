import { Request, Response } from "express";

const healthcheckHandler = async (req: Request, res: Response) => {
  // TODO: check DB connectivity
  res.json({ message: "OK" });
};

export default healthcheckHandler;
