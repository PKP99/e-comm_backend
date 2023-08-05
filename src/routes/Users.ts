import { Request, Response, Router } from "express";
import StatusCodes from "http-status-codes";
import { logIn, logOut, signUp } from "../service/UsersService";
import { verifyToken } from "../library/utils";
import { IResponse, ResponseError } from "../shared/interfaces";
import { BAD_REQUEST_NAME, SUCCESS } from "../shared/constants";

const router = Router();
const { OK } = StatusCodes;

/******************************************************************************
 *       "POST /api/v1/auth/login"
 ******************************************************************************/
router.post("/login", (req: Request, res: Response) => {
  try {
    logIn(req)
      .then((data) => {
        const resData: IResponse<[]> = {
          status: OK,
          message: SUCCESS,
          data: {
            success: data,
          },
        };
        res.status(OK).json(resData);
      })
      .catch((err) => {
        const errData = {
          status: err?.code,
          message: err?.message,
          data: {
            failure: err?.details,
          },
        };
        res.status(err?.code).json(errData);
      });
  } catch (error) {
    console.log(
      "Users.ts",
      "logIn",
      error,
      `Error occured POST API - /api/v1/auth/login`,
      { req, res }
    );
    throw new ResponseError(StatusCodes.BAD_REQUEST, BAD_REQUEST_NAME);
  }
});

/******************************************************************************
 *       "GET /api/v1/auth/logout"
 ******************************************************************************/
router.get("/logout", verifyToken, (req: Request, res: Response) => {
  try {
    logOut(req)
      .then((data) => {
        const resData: IResponse<[]> = {
          status: OK,
          message: SUCCESS,
          data: {
            success: data,
          },
        };
        res.status(OK).json(resData);
      })
      .catch((err) => {
        const errData = {
          status: err?.code,
          message: err?.message,
          data: {
            failure: err?.details,
          },
        };
        res.status(err?.code).json(errData);
      });
  } catch (error) {
    console.log(
      "Users.ts",
      "logout",
      error,
      `Error occured GET API - /api/v1/auth/logout`,
      { req, res }
    );
    throw new ResponseError(StatusCodes.BAD_REQUEST, BAD_REQUEST_NAME);
  }
});

/******************************************************************************
 *       "POST /api/v1/auth/signup"
 ******************************************************************************/
router.post("/signup", (req: Request, res: Response) => {
  try {
    signUp(req)
      .then((data) => {
        const resData: IResponse<[]> = {
          status: OK,
          message: SUCCESS,
          data: {
            success: data,
          },
        };
        res.status(OK).json(resData);
      })
      .catch((err) => {
        const errData = {
          status: err?.code,
          message: err?.message,
          data: {
            failure: err?.details,
          },
        };
        res.status(err?.code).json(errData);
      });
  } catch (error) {
    console.log(
      "Users.ts",
      "signup",
      error,
      `Error occured POST API - /api/v1/auth/signup`,
      { req, res }
    );
    throw new ResponseError(StatusCodes.BAD_REQUEST, BAD_REQUEST_NAME);
  }
});

export default router;
