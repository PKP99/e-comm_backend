import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IResponse } from "../shared/interfaces";
import {
  INVALID_TOKEN_MESSAGE,
  UNAUTHORIZED_MESSAGE,
} from "../shared/constants";
const { UNAUTHORIZED } = StatusCodes;

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const err: IResponse<Record<string, never>> = {
    status: UNAUTHORIZED,
    message: INVALID_TOKEN_MESSAGE,
    data: {
      failure: {},
    },
  };
  try {
    const isVerfied =
      req.headers.authorization === "Bearer E-Comm-TestUser" ? true : false;
    if (isVerfied) {
      next();
    } else {
      throw new Error(UNAUTHORIZED_MESSAGE);
    }
  } catch (error) {
    res.status(UNAUTHORIZED).json(err);
  }
};
