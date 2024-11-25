import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import type { User } from "../domain/user";
import UnauthorizedError from "../domain/errors/UnauthorizedError";

export interface AuthorizedRequest extends Request {
  user: Pick<User, "id" | "email">;
}

export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new UnauthorizedError("Unauthorized");
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!
    ) as unknown as Pick<User, "id" | "email">;
    (req as AuthorizedRequest).user = decoded;
    next();
  } catch (err) {
    next(new UnauthorizedError(err.message));
  }
};
