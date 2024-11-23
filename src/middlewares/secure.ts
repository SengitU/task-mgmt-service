import { Request, Response, NextFunction, RequestHandler } from "express";

export const secure =
  (handler: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await handler(req, res, next);
    } catch (err: unknown) {
      next(err);
    }
  };
