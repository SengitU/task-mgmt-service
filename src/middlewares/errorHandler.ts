import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  switch (error.name) {
    case "ValidationError":
    case "ConstraintError":
      res.status(400).json({ message: error.message });
      break;
    case "UnauthorizedError":
      res.status(401).json({ message: error.message });
      break;
    case "NotFoundError":
      res.status(404).json({ message: error.message });
      break;
    default:
      res.status(500).json({ message: "Something went wrong" });
      break;
  }
  next();
};
