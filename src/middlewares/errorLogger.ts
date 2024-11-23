import { NextFunction, Request, Response } from "express";

export const errorLogger = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // TODO: print stack only on dev
  console.error(error.message, error.stack);

  next(error);
};
