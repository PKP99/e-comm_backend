import { Request, Response, Router } from "express";
import StatusCodes from "http-status-codes";
import { getOrders, addOrder, updateOrder } from "../service/OrdersService";
import { authMiddleware, joiSchemaOrders, validate } from "../library/utils";
import { IResponse, ResponseError } from "../shared/interfaces";
import { BAD_REQUEST_NAME, SUCCESS } from "../shared/constants";
import { IOrders } from "src/db_schema/Orders/OrdersInterface";

const router = Router();
const { OK } = StatusCodes;

/******************************************************************************
 *       "GET /api/v1/orders"
 ******************************************************************************/
router.get("/", authMiddleware, (req: Request, res: Response) => {
  try {
    getOrders(req)
      .then((data) => {
        const resData: IResponse<IOrders[]> = {
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
      "Orders.ts",
      "getOrders",
      error,
      `Error occured GET API - /api/v1/orders`,
      { req, res }
    );
    throw new ResponseError(StatusCodes.BAD_REQUEST, BAD_REQUEST_NAME);
  }
});

/******************************************************************************
 *       "POST /api/v1/orders/add"
 ******************************************************************************/
router.post(
  "/add",
  validate(joiSchemaOrders),
  authMiddleware,
  (req: Request, res: Response) => {
    try {
      addOrder(req)
        .then((data) => {
          const resData: IResponse<IOrders[]> = {
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
        "Orders.ts",
        "addOrder",
        error,
        `Error occured POST API - /api/v1/orders/add`,
        { req, res }
      );
      throw new ResponseError(StatusCodes.BAD_REQUEST, BAD_REQUEST_NAME);
    }
  }
);

/******************************************************************************
 *       "POST /api/v1/orders/update/:orderId"
 ******************************************************************************/
router.post(
  "/update/:orderId",
  authMiddleware,
  (req: Request, res: Response) => {
    try {
      updateOrder(req)
        .then((data) => {
          const resData: IResponse<IOrders[]> = {
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
        "Orders.ts",
        "updateOrder",
        error,
        `Error occured POST API - /api/v1/orders/update/${req.params.orderId}`,
        { req, res }
      );
      throw new ResponseError(StatusCodes.BAD_REQUEST, BAD_REQUEST_NAME);
    }
  }
);

export default router;
