import Ajv, { JSONSchemaType } from "ajv";
import ajvErrors from "ajv-errors";
import addFormats from "ajv-formats";
import { Request, Response, NextFunction } from "express";

import ValidationError from "../domain/errors/ValidationError";

const ajv = new Ajv({ allErrors: true });
ajvErrors(ajv, { singleError: true });
addFormats(ajv);

const DataLocation = {
  params: "params",
  query: "query",
  body: "body",
} as const;

export const validate =
  <T>(schema: JSONSchemaType<T>, type = DataLocation.body) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const validatorFn = ajv.compile(schema);
    const toValidate = req[type];
    console.log({ toValidate });

    if (!validatorFn(toValidate)) {
      const errorMessages = validatorFn
        .errors!.map((validationError) => validationError.message)
        .join(", ");
      next(new ValidationError(errorMessages));
    } else {
      next();
    }
  };
