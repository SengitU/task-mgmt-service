import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../db/models/user";
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

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET_KEY as string // TODO: define env via global type
  ) as unknown as Pick<User, "id" | "email">;
  (req as AuthorizedRequest).user = decoded;

  next();
};
